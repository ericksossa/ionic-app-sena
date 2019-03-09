import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ModalController } from '@ionic/angular';
import { NewPostPage } from '../new-post/new-post.page';
import { EditProfilePage } from '../edit-profile/edit-profile.page';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage {
  constructor(
    private camera: Camera,
    private modalController: ModalController) { }

  async takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      if (base64Image) {
        // this.presentModal(base64Image);
      }

    }, (err) => {
      // Handle error
      console.log(JSON.stringify(err));
    });

  }

  // async presentModal(base64Image) {
  //   const modal = await this.modalController.create({
  //     component: NewPostPage,
  //     componentProps: { img: base64Image }
  //   });
  //   return await modal.present();
  // }

  editPerfil() {
    this.modalController
      .create({ component: EditProfilePage }).then((modal) => modal.present());
  }
}
