import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { ToastController } from '@ionic/angular';
import { DesactivateLoadingAction } from '../ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit, OnDestroy {
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
    ],
    'name': [
      { type: 'required', message: 'Name is required.' },
      { type: 'minlength', message: 'Name length must be longer or equal than 4 characters.' },
      { type: 'maxlength', message: 'Name length must be lower or equal to 30 characters.' },
      // { type: 'required', message: 'Email is required.'},
    ]

  };
  registerForm: FormGroup;
  subscription: Subscription = new Subscription();
  constructor(
    private authService: AuthService,
    private toastController: ToastController,
    private formBuilder: FormBuilder,
    public store: Store<AppState>) {
    this.createFormsControl();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
      ]))
    });

  }

  onSubmit() {
    this.authService.signIn(this.registerForm.value.name,
                            this.registerForm.value.email,
                             this.registerForm.value.password)
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
