import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { filter } from 'rxjs/operators';
import { PopEditComponent } from '../pop-edit/pop-edit.component';
import { Camera } from '@ionic-native/camera/ngx';
import { UploadFileService } from '../../../services/upload-file/upload-file.service';
import { User } from '../../../auth/user.model';
import { NgForm } from '@angular/forms';

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
    private uploadService: UploadFileService,
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
      this.userAvatar = 'assets/inicio/' + this.dataUser.user.avatar;
    } else {
      this.userAvatar = this.dataUser.user.avatar;
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

  updatePost() {
    this.dataUser.user.avatar = this.userAvatar;

    this.uploadService.uploadImageFirebase(this.dataUser)
      .then()
      .catch();
  }

  onSubmit(f: NgForm) {
    console.log(this.dataUser);
  }
}

