import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatPage } from './chat.page';
import { ChatDetailsPage } from 'src/app/components/modals/chat-details/chat-details.page';
import { ModalsModule } from 'src/app/components/modals/modals.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ModalsModule,
    RouterModule.forChild([{ path: '', component: ChatPage }])
  ],
  declarations: [ChatPage],
  entryComponents: [ChatDetailsPage]
})
export class ChatPageModule { }
