import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
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
  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) {
    this.createFormsControl();
  }

  ngOnInit() {
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

  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }

    this.authService.signUp(this.loginForm.value.email, this.loginForm.value.password)
      .then(resp => {
        this.router.navigate(['/tabs']);
      }).
      catch(err => console.log(err));

  }

}
