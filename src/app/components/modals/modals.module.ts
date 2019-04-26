import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
// modals-component
import { ChatDetailsPage } from './chat-details/chat-details.page';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { NewPostComponent } from './new-post/new-post.component';
import { EmojiPickerPageModule } from '../emoji-picker/emoji-picker.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { MapComponent } from './map/map.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmojiPickerPageModule,
    PipesModule
  ],
  declarations: [
    ChatDetailsPage,
    EditProfileComponent,
    NewPostComponent,
    MapComponent
  ],
  exports: [
    ChatDetailsPage,
    EditProfileComponent
  ],
  entryComponents: [
    MapComponent
  ]
})
export class ModalsModule { }
