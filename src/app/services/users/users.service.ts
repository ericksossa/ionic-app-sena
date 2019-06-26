import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private afDB: AngularFirestore) { }

  getUser(uid: string) {

    return this.afDB.collection(`${uid}`)
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
      );
  }

  getUserProfilePost(uid: string) {

    return this.afDB.collection(`${uid}/post/items`)
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
      );
  }

  updateUser(uid: string, dtaUser: any) {
   return this.afDB.doc(`${uid}/user`).update(dtaUser);
  }

}
