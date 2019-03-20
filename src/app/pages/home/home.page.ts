import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { UploadFileService } from 'src/app/services/upload-file/upload-file.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  items: any[] = [];
  constructor(
    private authService: AuthService,
    private uploadFileService: UploadFileService,
    public toastController: ToastController) {
    this.items = this.uploadFileService.images;
  }

  loadData(event) {
    this.uploadFileService.uploadImages()
      .then((resp: boolean) => {
        if (event) {
          event.target.complete();

          if (!resp) {
            this.presentToast('No more records to show');
            event.target.disabled = true;
          }

        }

      });
  }

  onLogout() {
    this.authService.logout();
  }

  doRefresh(event: any) {
    setTimeout(() => {
      event.target.complete();
    }, 1000);

  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }
}
