import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { UploadFileService } from 'src/app/services/upload-file/upload-file.service';
import { ToastController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { NewPostComponent } from 'src/app/components/modals/new-post/new-post.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  items: any[] = [];
  likes: number = 0;
  subscription: Subscription = new Subscription();
  constructor(
    private store: Store<AppState>,
    private authService: AuthService,
    private uploadFileService: UploadFileService,
    public toastController: ToastController,
    private modalController: ModalController) {
    this.subscription = this.store.select('uploadFile')
      .subscribe(resp => {
        this.items = resp.items;
      });

  }

  doRefresh(event: any) {
    setTimeout(() => {
      event.target.complete();
    }, 1000);

  }

  loadData(event) {
    // logica del scroll infinite
    this.uploadFileService.getImages()
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

  likePost() {
    console.log('Like');
    this.likes++;
  }

  async newPost() {
    const modal = await this.modalController.create({
      component: NewPostComponent
    });
    return await modal.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }

  onLogout() {
    this.authService.logout();
    this.uploadFileService.cancelSubs();
  }
}
