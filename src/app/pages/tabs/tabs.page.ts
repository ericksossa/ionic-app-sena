import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UploadFileService } from 'src/app/services/upload-file/upload-file.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  constructor(private authService: AuthService,
    private uploadFile: UploadFileService) { }

  ngOnInit() {
    this.authService.initAuthListener();
    this.uploadFile.initIngresoEgresoListener();
  }

}
