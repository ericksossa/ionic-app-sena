import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { ToastController } from '@ionic/angular';
import { DesactivateLoadingAction } from '../ui.actions';
import { LoginPage } from '../login/login.page';
import { LocationsService } from '../../services/locations/locations.service';
import { Keyboard } from '@ionic-native/keyboard/ngx';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit, OnDestroy {
  avatars = [
    {
      img: 'av-1.png',
      select: true
    },
    {
      img: 'av-2.png',
      select: false
    }

  ];
  avatarSel = 'av-1.png';

  avatarSlide = {
    slidesPerView: 2.0
  };
  errorMessages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'minlength', message: 'Email length must be longer or equal than 6 characters.' },
      { type: 'maxlength', message: 'Email length must be lower or equal to 50 characters.' },
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password length must be longer or equal than 6 characters.' },
      { type: 'maxlength', message: 'Password length must be lower or equal to 30 characters.' },
    ],
    'name': [
      { type: 'required', message: 'Name is required.' },
      { type: 'minlength', message: 'Name length must be longer or equal than 4 characters.' },
      { type: 'maxlength', message: 'Name length must be lower or equal to 30 characters.' },
    ],
    'phone': [
      { type: 'required', message: 'Phone is required.' },
      { type: 'minlength', message: 'Phone length must be longer or equal than 4 characters.' },
      { type: 'maxlength', message: 'Phone length must be lower or equal to 18 characters.' },
    ],
    'location': [
      { type: 'required', message: 'Location is required.' },

    ]

  };
  private list: string[] = [];
  public input = '';
  public countries: string[] = [];
  countryCode: string;
  registerForm: FormGroup;
  subscription: Subscription = new Subscription();
  constructor(
    private locatiService: LocationsService,
    private loginPage: LoginPage,
    private authService: AuthService,
    private toastController: ToastController,
    private keyboard: Keyboard,
    private formBuilder: FormBuilder,
    public store: Store<AppState>) {
    this.createFormsControl();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  add(item: string) {
    this.input = item;
    this.countries = [];
  }

  removeFocus() {
    this.keyboard.hide();
  }

  findLocation(e) {
    if (e.detail.value.length < 3) {
      return;
    }

    this.locatiService.getCities(e.detail.value)
      .subscribe((data: any) => {
        this.list = data._body;
      });

    this.countries = this.list.filter(item => item.toUpperCase().includes(this.input.toUpperCase()));
  }

  createFormsControl() {
    this.registerForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30),
      ])),
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
      ])),
      phone: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(18),
      ])),
      location: new FormControl('', Validators.compose([
        Validators.required,
      ]))
    });

  }

  selectAvatar(avatar) {
    this.avatars.forEach(av => av.select = false);
    this.avatarSel = avatar.img;
    avatar.select = true;
  }


  onCountryChange(e) {
    this.countryCode = e.dialCode;
  }

  telInputObject(e) {
    // console.log(e);

  }

  getNumber(e) {
    console.log(e);
    this.countryCode = e;
  }

  hasError(e) {
    console.log(e);

  }

  onSubmit() {
    console.log(this.countryCode);

    this.authService.signIn(
      this.registerForm.value.name,
      this.registerForm.value.email,
      this.registerForm.value.password,
      this.registerForm.value.phone = this.countryCode,
      this.registerForm.value.location,
      this.avatarSel
    ).then(() => this.loginPage.goSignIn())
      .catch((err) => {
        this.store.dispatch(new DesactivateLoadingAction());
        this.showError('Error: ' + err.message);
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
}
