import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { UploadFileService } from 'src/app/services/upload-file/upload-file.service';
import { ToastController, ModalController, ActionSheetController } from '@ionic/angular';
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
  start = 'star-outline';
  items: any[] = [];
  likes: number = 0; // TODO
  subscription: Subscription = new Subscription();
  constructor(
    private store: Store<AppState>,
    private authService: AuthService,
    private uploadFileService: UploadFileService,
    public toastController: ToastController,
    public actionSheetController: ActionSheetController,
    private modalController: ModalController) {
    this.subscription = this.store.select('uploadFile')
      .subscribe(resp => {
        this.items = resp.items;
      });

  }
  async presentActionSheet(item: any) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Options',
      mode: 'ios',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          // this.presentAlertConfirm(item);
        }
      }, {
        text: 'Share',
        icon: 'share',
        handler: () => {
          // this.shareWhatsapp(item);
        }
      },
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
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
    this.likes++;
    if (this.likes <= 1) {
      this.start = 'star';
      console.log('Like');

    } else {
      this.start = 'star-outline';
      this.likes = 0;
      console.log('Unlike');
      return;
    }

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
