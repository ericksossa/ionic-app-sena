import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { UploadFileService } from 'src/app/services/upload-file/upload-file.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {
  description: string = '';
  position: false;
  coords: string;
  loadGeo = false;
  imagePreview: any = '';
  image64: string;
  uploadPost: boolean = false;
  constructor(
    protected modalController: ModalController,
    private camera: Camera,
    private toastController: ToastController,
    private geolocation: Geolocation,
    private _uploadFile: UploadFileService) { }

  ngOnInit() {
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };

    this.processImagen(options);
  }

  selectPhoto() {
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };

    this.processImagen(options);
  }

  processImagen(options: CameraOptions) {
    this.camera.getPicture(options).then((imageData) => {
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      this.imagePreview = base64Image;
      this.image64 = imageData;

    }, (err) => {
      // Handle error
      this.presentToast(JSON.stringify(err), 'danger');
    });
  }

  newPost() {
    this.uploadPost = true;
    let file = {
      description: this.description,
      img: this.image64,
      coords: this.coords,
    };

    this._uploadFile.uploadImageFirebase(file)
      .then(() => {
        this.presentToast('Published correctly.', 'success');
        this.modalController.dismiss();
      })
      .catch((err) => {
        this.presentToast(`${err}`, 'danger');
        this.uploadPost = false;
      });

  }

  getGeo() {

    if (!this.position) {
      this.coords = null;
      return;
    }

    this.loadGeo = true;

    this.geolocation.getCurrentPosition().then((resp) => {
      this.coords = `${resp.coords.latitude}, ${resp.coords.longitude}`;
      console.log(this.coords);
      this.loadGeo = false;
    }).catch((error) => {
      this.loadGeo = false;
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

}
