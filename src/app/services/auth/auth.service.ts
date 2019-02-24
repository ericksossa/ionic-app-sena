import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../../auth/user.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { ActivateLoadingAction } from '../../auth/ui.actions';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private afDB: AngularFirestore,
    private store: Store<AppState>) { }
  // login
  signUp(email: string, password: string) {
    this.store.dispatch(new ActivateLoadingAction());
    return new Promise((resolve, rejected) => {
      this.afAuth.auth.
        signInWithEmailAndPassword(email, password).then(
          (user) => resolve(user))
        .catch(err => rejected(err));
    });

  }
  // register
  signIn(nombre: string, email: string, password: string) {

    // this.store.dispatch(new ActivarLoadingAction());

    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(resp => {
        const user: User = {
          nombre: nombre,
          email: resp.user.email,
          uid: resp.user.uid,
        };

        this.afDB.doc(`${user.uid}/usuario`)
          .set(user)
          .then(() => {
            // this.router.navigate(['/']);
            // this.store.dispatch(new DesactivarLoadingAction());
          });

      }).catch(error => {
        // this.store.dispatch(new DesactivarLoadingAction());
        // Swal.fire('Error en el login', error.message, 'error');

      });
  }


}
