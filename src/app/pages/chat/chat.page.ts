import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChatDetailsPage } from 'src/app/components/modals/chat-details/chat-details.page';

@Component({
  selector: 'app-chat',
  templateUrl: 'chat.page.html',
  styleUrls: ['chat.page.scss']
})
export class ChatPage {
  chat: any;
  constructor(private modalController: ModalController) { }

  async openChat() {
    const modal = await this.modalController.create({
      component: ChatDetailsPage,
      componentProps: this.chat
    });
    return await modal.present();
  }
}
