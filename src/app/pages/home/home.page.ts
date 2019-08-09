import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { UploadFileService } from 'src/app/services/upload-file/upload-file.service';
import { ToastController, ModalController, ActionSheetController, AlertController, PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { NewPostComponent } from 'src/app/components/modals/new-post/new-post.component';
import * as Bounce from 'bounce.js';
import { MapComponent } from 'src/app/components/modals/map/map.component';
import { PopInfoComponent } from '../../components/modals/pop-info/pop-info.component';
import { filter } from 'rxjs/operators';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  @ViewChild('bouncebtn', { read: ElementRef, static: false }) bouncebtn: ElementRef;
  start = 'star-outline';
  items: any[] = [];
  auth: any;
  likes: number = 0; // TODO
  subscription: Subscription = new Subscription();
  constructor(
    private store: Store<AppState>,
    private authService: AuthService,
    private uploadFileService: UploadFileService,
    public toastController: ToastController,
    public alertController: AlertController,
    public popoverController: PopoverController,
    private socialSharing: SocialSharing,
    public actionSheetController: ActionSheetController,
    private modalController: ModalController) {
    this.subscription = this.store.select('auth')
      .pipe(filter(auth => auth.user != null))
      .subscribe(auth => this.auth = auth.user.name);
    this.items = this.uploadFileService.images;
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
          this.presentAlertConfirm(item);
        }
      }, {
        text: 'Share',
        icon: 'share',
        handler: () => {
          this.shareWhatsapp(item);
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
        console.log(resp);

        if (event) {
          event.target.complete();

          if (!resp) {
            this.presentToast('No more records to show');
            event.target.disabled = true;
          }

        }

      });
  }

  async presentPopover(ev: any, value: any) {
    const popover = await this.popoverController.create({
      component: PopInfoComponent,
      componentProps: { user: value },
      event: ev,
      mode: 'ios'
    });
    return await popover.present();
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

  async openMap(coords: string) {
    if (!coords) {
      const alert = await this.alertController.create({
        header:   `I'm sorry`,
        message: `Apparently there's no map to show.`,
        buttons: ['OK'],
        mode: 'ios'
      });
      await alert.present();
      return;
    }

    const modal = await this.modalController.create({
      component: MapComponent,
      componentProps: { coords: coords }
    });
    return await modal.present();

  }

  async newPost() {
    const modal = await this.modalController.create({
      component: NewPostComponent
    });
    return await modal.present();
  }

  async presentAlertConfirm(item: any) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      mode: 'ios',
      message: '<strong>Are you sure you want to delete this picture?</strong>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.deleteItem(item);
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  public shareWhatsapp(item: any) {

    this.socialSharing.shareViaWhatsApp(item.description, item.img, item.img)
      .then(() => {

      }).catch((err) => {
        console.log(err);
      });
  }

  deleteItem(item: any) {
    console.log(item.key);

    this.uploadFileService.deletePost(item);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: "light"
    });
    toast.present();
  }

  onLogout() {
    this.authService.logout();
    this.uploadFileService.cancelSubs();
  }

  async logout() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Log Out of GTrip?',
      mode: 'ios',
      buttons: [{
        text: 'Log Out',
        role: 'destructive',
        icon: 'exit',
        handler: () => {
          this.onLogout();
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
}
