import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { filter } from 'rxjs/operators';
import { PopEditComponent } from '../pop-edit/pop-edit.component';
import { Camera } from '@ionic-native/camera/ngx';
import { UploadFileService } from '../../../services/upload-file/upload-file.service';
import { NgForm } from '@angular/forms';
import { UsersService } from '../../../services/users/users.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  userAvatar: any = '';
  subscription: Subscription = new Subscription();
  dataUser: any;
  constructor(
    private camera: Camera,
    private popoverController: PopoverController,
    private toastController: ToastController,
    private uploadService: UploadFileService,
    private userService: UsersService,
    private modalController: ModalController,
    private store: Store<AppState>) {
    this.subscription = this.store.select('auth')
      .pipe(filter(auth => auth.user != null))
      .subscribe(auth => {
        this.dataUser = auth;
        console.log(this.dataUser);
        this.verifyAvatar(this.dataUser.user.avatar);

      });
  }

  ngOnInit() {
  }

  verifyAvatar(img: string) {
    if (img.indexOf('av') > -1) {
      this.userAvatar = 'assets/inicio/' + img;
    } else {
      this.userAvatar = img;
    }

  }

  dismiss() {
    this.modalController.dismiss();
  }

  async selectAvatar(ev: any) {

    const popover = await this.popoverController.create({
      component: PopEditComponent,
      translucent: true
    });
    await popover.present();
    const { data } = await popover.onDidDismiss(); // se recibe la data
    this.camera.getPicture(data.img).then((imageData) => {
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      this.userAvatar = base64Image;
    });
  }


  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000,
      color: color
    });
    toast.present();
  }

  onSubmit(f: NgForm) {
    this.userService.updateUser(this.dataUser.user.uid, this.dataUser.user)
      .then(() => {
       this.presentToast('Yes, your data has been updated.', 'success');
        this.dismiss();
      }).catch();
  }
}

