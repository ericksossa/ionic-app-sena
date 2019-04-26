import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { UploadFileService } from 'src/app/services/upload-file/upload-file.service';
import { ToastController, ModalController, ActionSheetController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { NewPostComponent } from 'src/app/components/modals/new-post/new-post.component';
import * as Bounce from 'bounce.js';
import { MapComponent } from 'src/app/components/modals/map/map.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  @ViewChild('bouncebtn', { read: ElementRef }) bouncebtn: ElementRef;
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
    let bounce = new Bounce();
    bounce
      .translate({
        from: { x: -300, y: 0 },
        to: { x: 0, y: 0 },
        duration: 600,
        stiffness: 4
      })
      .scale({
        from: { x: 1, y: 1 },
        to: { x: 0.1, y: 2.3 },
        easing: "sway",
        duration: 800,
        delay: 65,
        stiffness: 2
      })
      .scale({
        from: { x: 1, y: 1 },
        to: { x: 5, y: 1 },
        easing: "sway",
        duration: 300,
        delay: 30,
      })
      .applyTo(this.bouncebtn.nativeElement);
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
