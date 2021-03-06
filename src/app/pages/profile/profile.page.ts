import { Component, OnInit, OnDestroy, ViewChild, ElementRef, QueryList, ViewChildren } from '@angular/core';

import { ModalController, IonSegment } from '@ionic/angular';
import { EditProfileComponent } from 'src/app/components/modals/edit-profile/edit-profile.component';
import { NewPostComponent } from 'src/app/components/modals/new-post/new-post.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { filter } from 'rxjs/operators';
import { UploadFileService } from 'src/app/services/upload-file/upload-file.service';
import { UploadFile } from 'src/app/services/upload-file/upload-file.interface';
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import * as Bounce from 'bounce.js';
import { MapComponent } from 'src/app/components/modals/map/map.component';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit, OnDestroy {
  @ViewChild(IonSegment, { static: true }) segment: IonSegment;
  @ViewChildren('bouncebtn', { read: ElementRef }) bouncebtn: QueryList<ElementRef>;
  galleryType = 'grid';
  start = 'star-outline';
  likes: number = 0; // TODO
  userAvatar: any;
  userName: string;
  location: string;
  languages: string;
  description: string;
  items: any[] = [];
  subscription: Subscription;
  constructor(
    private store: Store<AppState>,
    private modalController: ModalController,
    private uploadService: UploadFileService,
    private authService: AuthService,
    public alertController: AlertController,
    private socialSharing: SocialSharing,
    public actionSheetController: ActionSheetController) {
    this.subscription = this.store.select('uploadFile')
      .subscribe(resp => {
        this.items = resp.items;
      });
  }

  ngOnInit() {
    this.subscription = this.store.select('auth')
      .pipe(filter(auth => auth.user != null))
      .subscribe(auth => {
        this.userName = auth.user.name;
        this.location = auth.user.location;
        this.languages = auth.user.languages;
        this.description = auth.user.description;
        this.verifyAvatar(auth.user.avatar);
      });
    // valor por defecto del IonSegment
    this.segment.value = 'grid';
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  verifyAvatar(img: string) {

    if (img.indexOf('av') > -1) {
      this.userAvatar = 'assets/inicio/' + img;
    } else {
      this.userAvatar = img;
    }

  }

  segmentChanged(e) {
    this.galleryType = e.detail.value;
  }

  async newPost() {
    const modal = await this.modalController.create({
      component: NewPostComponent
    });
    return await modal.present();
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

  async editProfile() {
    const modal = await this.modalController.create({
      component: EditProfileComponent
    });
    return await modal.present();
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

    this.socialSharing.share(item.description, item.img, item.img)
      .then(() => {

      }).catch((err) => {
        console.log(err);
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
    return;
  }

  deleteItem(item: any) {
    this.uploadService.deletePost(item);
  }


  onLogout() {
    this.authService.logout();
    this.uploadService.cancelSubs();
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
