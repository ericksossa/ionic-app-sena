import { Component, OnInit, OnDestroy } from '@angular/core';

import { ModalController } from '@ionic/angular';
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

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit, OnDestroy {
  userName: string;
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
      .subscribe(auth => this.userName = auth.user.name);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async newPost() {
    const modal = await this.modalController.create({
      component: NewPostComponent
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
    this.socialSharing.shareViaWhatsApp(item.description, item.img)
      .then(() => {

      }).catch((err) => {
        console.log(err);
      });
  }

  deleteItem(item: any) {
    this.uploadService.deletePost(item.uid)
      .then();
  }

  onLogout() {
    this.authService.logout();
    this.uploadService.cancelSubs();
  }
}
