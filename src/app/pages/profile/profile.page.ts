import { Component, OnInit, OnDestroy } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { EditProfileComponent } from 'src/app/components/modals/edit-profile/edit-profile.component';
import { NewPostComponent } from 'src/app/components/modals/new-post/new-post.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { filter } from 'rxjs/operators';
import { UploadFileService } from 'src/app/services/upload-file/upload-file.service';
import { UploadFile } from 'src/app/services/upload-file/upload-file.interface';


@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit, OnDestroy {
  userName: string;
  items: any[] = [];
  subscription: Subscription;
  constructor(
    private store: Store<AppState>,
    private modalController: ModalController,
    private uploadService: UploadFileService,
    private authService: AuthService) {
    this.subscription = this.store.select('uploadFile')
      .subscribe(resp => {
        this.items = resp.items;
      });
  }

  ngOnInit() {
    this.subscription = this.store.select('auth')
      .pipe(filter(auth => auth.user != null))
      .subscribe(auth => this.userName = auth.user.name);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async newPost() {
    const modal = await this.modalController.create({
      component: NewPostComponent
    });
    return await modal.present();
  }

  async editProfile() {
    const modal = await this.modalController.create({
      component: EditProfileComponent
    });
    return await modal.present();
  }

  deleteItem(item: UploadFile) {
    this.uploadService.deletePost(item.key)
      .then();
  }

  onLogout() {
    this.authService.logout();
  }
}
