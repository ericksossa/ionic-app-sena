import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChatDetailsComponent } from 'src/app/components/modals/chat-details/chat-details.component';

@Component({
  selector: 'app-chat',
  templateUrl: 'chat.page.html',
  styleUrls: ['chat.page.scss']
})
export class ChatPage {

  constructor(private modalController: ModalController) { }

  openChat() {
    this.modalController
      .create({ component: ChatDetailsComponent })
      .then((modal) => modal.present());

  }
}
