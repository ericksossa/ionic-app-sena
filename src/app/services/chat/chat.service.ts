import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<any>;
  public chats: any[] = [];

  constructor(private afDB: AngularFirestore) { }

  getMessages() {
    this.itemsCollection = this.afDB.collection<any>('chats');
    return this.itemsCollection.valueChanges();
  }

  addMessage() {

    // this.afDB.doc(`${this.authService.getUsuario().uid}/chats`)
    //   .collection('items').add({ ...post });

  }

}
