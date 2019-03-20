import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { UploadFile } from './upload-file.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  images: UploadFile[] = [];
  lastKey: string = null;

  constructor(private afDB: AngularFireDatabase) {
    this.uploadLastFile().subscribe(() => this.uploadImages());
  }

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
          uploadTask.snapshot.ref.getDownloadURL()
            .then((downloadURL) => {
              let url = downloadURL;
              this.createPost(file.description, url, fileName);
              resolve();
            });
        }
      );
    });

    return promise;
  }

  private uploadLastFile() {
    // carga la ultima key
    return this.afDB.list('/post', ref => ref.orderByKey().limitToLast(1))
      .valueChanges()
      .pipe(map((post: any) => {
        this.lastKey = post[0].key;
        this.images.push(post[0]);
      }));

  }

  uploadImages() {
    return new Promise((resolve, reject) => {
      this.afDB.list('/post',
        ref => ref.limitToLast(3)
          .orderByKey()
          .endAt(this.lastKey)
      ).valueChanges()
        .subscribe((posts: any) => {
          posts.pop();

          if (posts.length === 0) {
            resolve(false);
            return;
          }

          this.lastKey = posts[0].key;
          for (let i = posts.length - 1; i >= 0; i--) {
            let post = posts[i];
            this.images.push(post);
          }

          resolve(true);
        });
    });
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
