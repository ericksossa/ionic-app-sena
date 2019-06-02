import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { filter } from 'rxjs/operators';
import { PopEditComponent } from '../pop-edit/pop-edit.component';
import { Camera } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  imagePreview: any = '';
  subscription: Subscription = new Subscription();
  dataUser: any;
  constructor(
    private camera: Camera,
    private popoverController: PopoverController,
    private modalController: ModalController,
    private store: Store<AppState>) {
    this.subscription = this.store.select('auth')
      .pipe(filter(auth => auth.user != null))
      .subscribe(auth => {
        this.dataUser = auth;
        console.log(this.dataUser);
        this.imagePreview = 'assets/inicio/' + this.dataUser.user.avatar;

      });
  }

  ngOnInit() {
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
      this.imagePreview = base64Image;
    });
  }


}

