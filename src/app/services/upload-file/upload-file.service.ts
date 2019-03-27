import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { UploadFile } from './upload-file.interface';
import { map, filter } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { SetItemsAction } from './upload-file.actions';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  itemsListenerSubcription: Subscription;
  postItemsSubcription: Subscription;
  images: any[] = [];
  lastKey: string = null;
  constructor(
    private afDB: AngularFirestore,
    private authService: AuthService,
    private store: Store<AppState>) {
    // this.uploadLastFile().subscribe(() => this.getImages());
  }

  initIngresoEgresoListener() {
    this.itemsListenerSubcription = this.store.select('auth')
      .pipe(
        filter(auth => auth.user != null)
      )
      .subscribe(auth => this.getImages(auth.user.uid));

  }


  uploadImageFirebase(file: UploadFile) {

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
    // return this.afDB1.list('/post', ref => ref.orderByKey().limitToLast(1))
    //   .valueChanges()
    //   .pipe(map((post: any) => {
    //     this.lastKey = post[0].key;
    //     this.images.push(post[0]);
    //   }));

  }

  getImages(uid?: string) {
    return new Promise((resolve, reject) => {
      this.postItemsSubcription = this.afDB.collection(`${uid}/post/items`)
        .snapshotChanges()
        .pipe(
          map(resp => {
            return resp.map(doc => {
              return {
                uid: doc.payload.doc.id,
                ...doc.payload.doc.data()
              };
            });
          })
        ).subscribe((coleccion: any[]) => {
          this.store.dispatch(new SetItemsAction(coleccion));
          this.images.push(coleccion);
          resolve(true);

        });
    });
  }

  private createPost(description: string, url: string, fileName: string) {

    let post: UploadFile = {
      img: url,
      description: description,
      key: fileName,
      createAt: new Date().toString(),
    };

    this.afDB.doc(`${this.authService.getUsuario().uid}/post`)
      .collection('items').add({ ...post });
    this.images.push(post);
  }

  deletePost(uid: string) {
    return this.afDB.doc(`${this.authService.getUsuario().uid}/post/items/${uid}`)
    .delete();
  }
}
