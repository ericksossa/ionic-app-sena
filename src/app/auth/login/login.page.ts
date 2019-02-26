import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastController, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { DesactivateLoadingAction } from '../ui.actions';


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
  loading: boolean;
  constructor(
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

  async onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }

    this.authService.signUp(this.loginForm.value.email, this.loginForm.value.password)
      .then(resp => {
        // bien
        if (resp) {
          this.presentLoading();
        }

        this.store.dispatch(new DesactivateLoadingAction());
        if (!this.loading) {
          this.router.navigateByUrl('/tabs/home');
        }

      }).
      // err
      catch(err => {
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
    const loading = await this.loadingController.create({
      spinner: 'crescent',
      duration: 500,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }
}


