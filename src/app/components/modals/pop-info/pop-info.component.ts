import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ChatDetailsPage } from '../chat-details/chat-details.page';

@Component({
  selector: 'app-pop-info',
  templateUrl: './pop-info.component.html',
  styleUrls: ['./pop-info.component.scss']
})
export class PopInfoComponent implements OnInit {
  user: any;
  constructor(private modalController: ModalController,
    private navParams: NavParams) { }

  ngOnInit() {
    this.user = this.navParams.get('user');
  }

  async openChat() {
    const modal = await this.modalController.create({
      component: ChatDetailsPage,
      componentProps: { user: this.user }
    });
    return await modal.present();
  }

  async viewProfile() {

  }

}
