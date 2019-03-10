import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-chat-details',
  templateUrl: './chat-details.page.html',
  styleUrls: ['./chat-details.page.scss'],
})
export class ChatDetailsPage implements OnInit {
  showEmojiPicker = false;
  editorMsg = '';
  name: string;
  constructor(
    private modalController: ModalController,
    private navParams: NavParams) { }

  ngOnInit() {
    this.name = this.navParams.get('name');
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
