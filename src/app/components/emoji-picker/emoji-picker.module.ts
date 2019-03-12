import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmojiPickerPage } from './emoji-picker.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [EmojiPickerPage],
  exports: [
    EmojiPickerPage
  ]
})
export class EmojiPickerPageModule { }
