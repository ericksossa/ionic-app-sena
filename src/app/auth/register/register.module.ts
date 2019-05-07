import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPage } from './register.page';
import {Ng2TelInputModule} from 'ng2-tel-input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Ng2TelInputModule,
    ReactiveFormsModule,
    IonicModule,
  ],
  declarations: [RegisterPage],
  exports: [
    RegisterPage
  ]
})
export class RegisterPageModule { }
