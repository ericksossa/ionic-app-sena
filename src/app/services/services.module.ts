import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service';
import { UploadFileService } from './upload-file/upload-file.service';
import { ChatService } from './chat/chat.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AuthService,
    UploadFileService,
    ChatService
  ]
})
export class ServicesModule { }
