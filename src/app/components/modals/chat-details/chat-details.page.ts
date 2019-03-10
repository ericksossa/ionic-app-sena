import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-chat-details',
  templateUrl: './chat-details.page.html',
  styleUrls: ['./chat-details.page.scss'],
})
export class ChatDetailsPage implements OnInit {
  showEmojiPicker = false;
  editorMsg = '';
  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  switchEmojiPicker() { }

  onFocus() { }


  dismiss() {
    this.modalController.dismiss();
  }

  sendMsg() {
    if (!this.editorMsg.trim()) { return; }
    console.log(this.editorMsg);
    // Mock message
    const id = Date.now().toString();

    this.editorMsg = '';
  }

}
