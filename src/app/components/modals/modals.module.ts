import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
// modals-component
import { ChatDetailsPage } from './chat-details/chat-details.page';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { NewPostComponent } from './new-post/new-post.component';
import { EmojiPickerPageModule } from '../emoji-picker/emoji-picker.module';
import { EmojiService } from 'src/app/services/emoji/emoji.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmojiPickerPageModule
  ],
  declarations: [
    ChatDetailsPage,
    EditProfileComponent,
    NewPostComponent],
  exports: [
    ChatDetailsPage,
    EditProfileComponent
  ]
})
export class ModalsModule { }
