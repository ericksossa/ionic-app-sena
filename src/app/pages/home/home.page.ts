import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  items: Observable<any[]>;
  constructor(
    private authService: AuthService,
    private afDB: AngularFireDatabase) {
    this.items = afDB.list('post').valueChanges();
  }


  onLogout() {
    this.authService.logout();
  }

  doRefresh(event: any) {
    setTimeout(() => {
      event.target.complete();
    }, 1000);

  }
}
