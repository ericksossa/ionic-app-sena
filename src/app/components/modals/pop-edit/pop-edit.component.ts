import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-pop-edit',
  templateUrl: './pop-edit.component.html',
  styleUrls: ['./pop-edit.component.scss']
})
export class PopEditComponent implements OnInit {

  constructor(private camera: Camera,
    private popoverController: PopoverController) { }

  ngOnInit() {
  }

  openGallery() {
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

  openCamera() {
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

  processImagen(options: CameraOptions) {

    if (!options) {
      return;
    }

    this.popoverController.dismiss({
      img: options
    });
  }

}
