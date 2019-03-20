import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../../auth/user.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { ActivateLoadingAction } from '../../auth/ui.actions';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { UnSetUserAction, SetUserAction } from 'src/app/auth/auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User;
  private userSubscription: Subscription = new Subscription();
  constructor(
    private afAuth: AngularFireAuth,
    private afDB: AngularFirestore,
    private store: Store<AppState>,
    private router: Router) { }

  initAuthListener() {
    this.userSubscription = this.afAuth.authState.subscribe((fbuser: firebase.User) => {
      if (fbuser) {
        this.afDB.doc(`${fbuser.uid}/usuario`)
          .valueChanges().subscribe((usuarioObj: any) => {
            const newUser = new User(usuarioObj);
            this.store.dispatch(new SetUserAction(newUser));
            this.user = newUser;
          });
      } else {
        this.user = null;
        this.userSubscription.unsubscribe();
      }

    });
  }

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
  signIn(name: string, email: string, password: string) {

    this.store.dispatch(new ActivateLoadingAction());

    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(resp => {
        const user: User = {
          name: name,
          email: resp.user.email,
          uid: resp.user.uid,
        };

        this.afDB.doc(`${user.uid}/user`)
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

  logout() {
    this.afAuth.auth.signOut()
      .then(() => {
        this.router.navigate(['/login']);
        this.store.dispatch(new UnSetUserAction());

      });
  }

  isAuth() {
    return this.afAuth.authState
      .pipe(
        map(fbUser => {
          if (fbUser == null) {
            this.router.navigate(['/login']);
          }

          return fbUser != null;
        })
      );
  }


}
