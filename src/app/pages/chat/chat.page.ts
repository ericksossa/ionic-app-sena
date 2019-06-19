import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChatDetailsPage } from 'src/app/components/modals/chat-details/chat-details.page';

@Component({
  selector: 'app-chat',
  templateUrl: 'chat.page.html',
  styleUrls: ['chat.page.scss']
})
export class ChatPage {
  name = 'test';
  constructor(private modalController: ModalController) { }

  async openChat(name: any) {
    const modal = await this.modalController.create({
      component: ChatDetailsPage,
      componentProps: { user: name }
    });
    return await modal.present();
  }
}
