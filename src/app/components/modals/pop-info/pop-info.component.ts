import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, PopoverController } from '@ionic/angular';
import { ChatDetailsPage } from '../chat-details/chat-details.page';
import { Router } from '@angular/router';
import { ChatService } from '../../../services/chat/chat.service';

@Component({
  selector: 'app-pop-info',
  templateUrl: './pop-info.component.html',
  styleUrls: ['./pop-info.component.scss']
})
export class PopInfoComponent implements OnInit {
  user: any;
  constructor(
    private router: Router,
    private chatService: ChatService,
    private popOverController: PopoverController,
    private modalController: ModalController,
    private navParams: NavParams) { }

  ngOnInit() {
    this.user = this.navParams.get('user');
  }

  async openChat() {
    this.chatService.create(this.user.uid);
    const modal = await this.modalController.create({
      component: ChatDetailsPage,
      componentProps: { chat: this.user }
    });
    this.close();
    return await modal.present();
  }

  async viewProfile() {
    this.router.navigate(['tabs/viewprofile', this.user.uid]);
    this.close();
  }

  close() {
    this.popOverController.dismiss();
  }
}
