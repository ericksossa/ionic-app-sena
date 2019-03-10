import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
// modals-component
import { ChatDetailsPage } from './chat-details/chat-details.page';
import { EditProfileComponent } from './edit-profile/edit-profile.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [
    ChatDetailsPage,
    EditProfileComponent],
  exports: [
    ChatDetailsPage,
    EditProfileComponent]
})
export class ModalsModule { }
