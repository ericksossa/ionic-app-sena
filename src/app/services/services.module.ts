import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service';
import { UploadFileService } from './upload-file/upload-file.service';
import { ChatService } from './chat/chat.service';
import { LocationsService } from './locations/locations.service';
import { UsersService } from './users/users.service';
import { JsonpModule, HttpModule } from '@angular/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    JsonpModule,
    HttpModule
  ],
  providers: [
    AuthService,
    UploadFileService,
    ChatService,
    LocationsService,
    UsersService
  ]
})
export class ServicesModule { }
