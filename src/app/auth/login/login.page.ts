import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastController, LoadingController, Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { DesactivateLoadingAction } from '../ui.actions';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Facebook } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  errorMessages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'minlength', message: 'Email length must be longer or equal than 6 characters.' },
      { type: 'maxlength', message: 'Email length must be lower or equal to 50 characters.' },
      // { type: 'required', message: 'Email is required.'},
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password length must be longer or equal than 6 characters.' },
      { type: 'maxlength', message: 'Password length must be lower or equal to 30 characters.' },
      // { type: 'required', message: 'Email is required.'},

    ]
  };
  loginForm: FormGroup;
  subscription: Subscription;
  load: any;
  loading: boolean;
  constructor(
    private screenOrientation: ScreenOrientation,
    private fb: Facebook,
    private googlePlus: GooglePlus,
    private platform: Platform,
    private afAuth: AngularFireAuth,
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private store: Store<AppState>) {
    this.createFormsControl();
  }

  ngOnInit() {
    this.subscription = this.store.select('ui')
      .subscribe(ui => this.loading = ui.isLoading);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  createFormsControl() {
    this.loginForm = this.formBuilder.group({
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),

      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.minLength(6),
        Validators.maxLength(50),
      ]))
    });
  }

  signInWithFacebook() {
    if (this.platform.is('cordova')) {
      // celular
      this.fb.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        firebase.auth().signInWithCredential(facebookCredential)
          .then(user => {
            console.log(user);
            if (user) {

              this.router.navigateByUrl('/tabs/home');
            }
          }).catch(e => console.error(JSON.stringify(e)));
      });

    } else {
      // escritorio
      this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(res => console.log(res));
    }
  }

  signInGoogle() {
    this.googlePlus.login({
      'webClientId': '246001293386-2lq0oav4422rb3c3s5047qrms46rulkp.apps.googleusercontent.com',
      'offline': true
    }).then(res => {
      firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
        .then(success => {
          console.log('Firebase success: ' + JSON.stringify(success));
          this.router.navigateByUrl('/tabs/home');
        })
        .catch(error => console.log('Firebase failure: ' + JSON.stringify(error)));
    }).catch(err => console.error('Error: ', err));
  }

  async onSubmit() {
    if (!this.loginForm.valid) { return; }

    this.presentLoading();
    this.authService.signUp(this.loginForm.value.email, this.loginForm.value.password)
      .then(resp => {
        // bien
        if (resp) { this.load.dismiss(); }

        this.store.dispatch(new DesactivateLoadingAction());
        if (!this.loading) {
          this.router.navigateByUrl('/tabs/home');
        }

      }).
      // err
      catch(err => {
        if (err.message) { this.load.dismiss(); }
        this.showError('Error: ' + err.message);
        this.store.dispatch(new DesactivateLoadingAction());
      });

  }

  async showError(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000,
      color: 'danger'
    });
    toast.present();
  }

  async presentLoading() {
    this.load = await this.loadingController.create({
      spinner: 'crescent',
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return this.load.present();
  }
}
