import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { UploadFile } from './upload-file.interface';
import { map, filter } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { SetItemsAction, UnsetItemsAction } from './upload-file.actions';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  itemsListenerSubcription: Subscription;
  postItemsSubcription: Subscription;
  subscription: Subscription;
  userName: any;
  images: any[] = [];
  lastKey: string = '';
  constructor(
    private afDB: AngularFirestore,
    private angularDataBase: AngularFireDatabase,
    private authService: AuthService,
    private store: Store<AppState>) {
    this.uploadLastFile().subscribe(() => this.getImages());
    this.subscription = this.store.select('auth')
      .pipe(filter(auth => auth.user != null))
      .subscribe(auth => this.userName = auth.user.name);
  }

  initIngresoEgresoListener() {
    this.itemsListenerSubcription = this.store.select('auth')
      .pipe(
        filter(auth => auth.user != null)
      )
      .subscribe(auth => this.getUserImages(auth.user.uid));

  }

  uploadImageFirebase(file: UploadFile) {
    let promise = new Promise((resolve, reject) => {

      const storeRef = firebase.storage().ref();
      const fileName: string = new Date().valueOf().toString();

      // sube el archivo de img al storage
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
              this.createPost(file.description, url, fileName, file.coords);
              resolve();
            });
        }
      );
    });

    return promise;
  }

  private uploadLastFile() {
    // carga la ultima key
    return this.angularDataBase.list('/post', ref => ref.orderByKey().limitToLast(1))
      .valueChanges()
      .pipe(map((post: any) => {
        this.lastKey = post[0].key;
        this.images.push(post[0]);
      }));

  }

  getImages() {
    // obtiene todas las imagenes de todos los user desc
    return new Promise((resolve, reject) => {
      this.angularDataBase.list('/post',
        ref => ref.limitToLast(3)
          .orderByKey()
          .endAt(this.lastKey)
      ).valueChanges()
        .subscribe((posts: any[]) => {
          posts.pop();

          if (posts.length === 0) {
            resolve(false);
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

  getUserImages(uid?: string) {
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
          resolve(true);
        });
    });
  }

  cancelSubs() {
    this.subscription.unsubscribe();
    this.itemsListenerSubcription.unsubscribe();
    this.postItemsSubcription.unsubscribe();
    this.store.dispatch(new UnsetItemsAction());
  }

  private createPost(description: string, url: string, fileName: string, coords?: string) {

    let post: UploadFile = {
      userAvatar: this.authService.getUser().avatar,
      description: description,
      img: url,
      user: this.userName,
      coords: coords,
      key: fileName,
      createAt: new Date().toString(),
      uid: this.authService.getUser().uid,
    };

    this.afDB.doc(`${this.authService.getUser().uid}/post`)
      .collection('items').add({ ...post });
    this.angularDataBase.object(`/post/${fileName}`).update(post);
    this.images.push(post);
  }

  deletePost(item: any) {
    this.afDB.doc(`${this.authService.getUser().uid}/post/items/${item.uid}`)
      .delete();
    this.angularDataBase.list(`/post/${item.key}`).remove();
  }
}
