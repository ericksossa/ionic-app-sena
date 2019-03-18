import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { UploadFile } from './upload-file.interface';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  images: UploadFile[] = [];
  constructor(private afDB: AngularFireDatabase) { }

  getImageFirebase(file: UploadFile) {
    let promise = new Promise((resolve, reject) => {

      const storeRef = firebase.storage().ref();
      const fileName: string = new Date().valueOf().toString();

      let uploadTask: firebase.storage.UploadTask =
        storeRef.child(`img/${fileName}`)
          .putString(file.img, 'base64', { contentType: 'image/jpeg' });

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        () => { }, // saber el % de cuantos Mbs se han subido
        (error) => {
          // manejo de err
          console.log(JSON.stringify(error));
          reject();
        },
        () => {
          // todo bien
          console.log('Archivo subido');
          let url = uploadTask.snapshot.downloadURL;

          this.createPost(file.description, url, fileName);
          resolve();
        }
      );
    });

    return promise;
  }

  private createPost(description: string, url: string, fileName: string) {

    let post: UploadFile = {
      img: url,
      description: description,
      key: fileName
    };

    console.log(JSON.stringify(post));
    // se crea el post en firebase se omite el then
    // this.afDB.list('/post').push(post)
    this.afDB.object(`/post/${fileName}`).update(post);
    this.images.push(post);
  }
}
