import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service';
import { UploadFileService } from './upload-file/upload-file.service';
import { ChatService } from './chat/chat.service';
import { LocationsService } from './locations/locations.service';
import { JsonpModule } from '@angular/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    JsonpModule
  ],
  providers: [
    AuthService,
    UploadFileService,
    ChatService,
    LocationsService
  ]
})
export class ServicesModule { }
