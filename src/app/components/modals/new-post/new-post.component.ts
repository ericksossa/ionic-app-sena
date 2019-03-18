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
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    };

    this.camera.getPicture(options).then((imageData) => {
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      this.imagePreview = base64Image;
      this.image64 = imageData;

    }, (err) => {
      // Handle error
      this.showError(JSON.stringify(err));
    });

  }

  selectPhoto() {
    const options: ImagePickerOptions = {
      quality: 80,
      outputType: 1,
      maximumImagesCount: 1
    };

    this.imagePicker.getPictures(options).then((results) => {
      for (let i = 0; i < results.length; i++) {
        this.imagePreview = 'data:image/jpeg;base64,' + results[i];
        this.image64 = results[i];
      }
    }, (err) => { this.showError(JSON.stringify(err)); });
  }

  newPost() {

    let file = {
      img: this.image64,
      description: this.description
    };

    this._uploadFile.getImageFirebase(file)
      .then(() => this.modalController.dismiss())
      .catch((err) => {
        this.showError('error: ' + err);
      });


  }

  async showError(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000,
      color: 'danger'
    });
    toast.present();
  }

}
