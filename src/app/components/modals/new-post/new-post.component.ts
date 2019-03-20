import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { UploadFileService } from 'src/app/services/upload-file/upload-file.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {
  description: string = '';
  imagePreview: any = '';
  image64: string;
  uploadPost: boolean = false;
  constructor(
    protected modalController: ModalController,
    private camera: Camera,
    private toastController: ToastController,
    private imagePicker: ImagePicker,
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
      img: this.image64,
      description: this.description
    };

    this._uploadFile.getImageFirebase(file)
      .then(() => {
        this.presentToast('Published correctly.', 'success')
        this.modalController.dismiss();
      })
      .catch((err) => {
        this.presentToast(`${err}`, 'danger');
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
