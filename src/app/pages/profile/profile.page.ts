import { Component } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { EditProfileComponent } from 'src/app/components/modals/edit-profile/edit-profile.component';
import { NewPostComponent } from 'src/app/components/modals/new-post/new-post.component';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage {
  constructor(
    private modalController: ModalController,
    private authService: AuthService) { }

  onLogout() {
    this.authService.logout();
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

}
