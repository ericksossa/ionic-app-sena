import { Component } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { EditProfileComponent } from 'src/app/components/modals/edit-profile/edit-profile.component';
import { NewPostComponent } from 'src/app/components/modals/new-post/new-post.component';


@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage {
  constructor(
    private modalController: ModalController) { }

 
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
