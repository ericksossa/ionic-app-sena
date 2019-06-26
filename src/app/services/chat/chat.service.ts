import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { Subscription } from 'rxjs';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<any>;
  public chats: any[] = [];
  subscription: Subscription;
  uid: any;
  constructor(private afDB: AngularFirestore,
    private store: Store<AppState>) {
    // this.subscription = this.store.select('auth')
    //   .pipe(filter(auth => auth.user != null))
    //   .subscribe(auth => );
  }

  get(chatId) {
    return this.afDB
      .collection<any>('chats')
      .doc(chatId)
      .snapshotChanges()
      .pipe(
        map(doc => {
          return { id: doc.payload.id, ...doc.payload.data() };
        })
      );
  }

  async create(uid: string) {

    const data = {
      uid,
      createdAt: Date.now(),
      count: 0,
      messages: []
    };

    this.afDB.collection(`chats`).doc(uid).ref.set(data);

  }

  getMessages() {
    this.itemsCollection = this.afDB.collection<any>('chats');
    return this.itemsCollection.valueChanges();
  }

  sendMsgToFirebase(content: any, chatId: string) {

    const ref = this.afDB.collection('chats').doc(chatId);
    ref.update({
      messages: firestore.FieldValue.arrayUnion(content),
    });

  }

}
