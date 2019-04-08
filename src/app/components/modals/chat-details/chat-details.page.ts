import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController, NavParams, IonContent } from '@ionic/angular';
import { ChatService } from 'src/app/services/chat/chat.service';


@Component({
  selector: 'app-chat-details',
  templateUrl: './chat-details.page.html',
  styleUrls: ['./chat-details.page.scss'],
})
export class ChatDetailsPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  @ViewChild('chat_input') messageInput: ElementRef;
  showEmojiPicker = false;
  editorMsg: any = '';
  msgList: any[] = [];
  name: string;
  user: any;
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private chatService: ChatService) { }

  ngOnInit() {
    this.name = this.navParams.get('name');
  }

  switchEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
    if (!this.showEmojiPicker) {
      this.focus();
    } else {
      this.setTextareaScroll();
    }
    // this.content.resize();
    this.scrollToBottom();
  }

  onFocus() {
    this.showEmojiPicker = false;
    // this.content.resize();
    this.scrollToBottom();
  }


  dismiss() {
    this.modalController.dismiss();
  }

  sendMsg() {
    if (!this.editorMsg.trim()) { return; }
    // Mock message
    const id = Date.now().toString();
    let newMsg: any = {
      // messageId: Date.now().toString(),
      // userId: this.user.id,
      // userName: this.user.name,
      // userAvatar: this.user.avatar,
      // toUserId: this.toUser.id,
      time: Date.now(),
      message: this.editorMsg,
      status: ''
    };

    this.msgList.push(newMsg);
    console.log(this.msgList);
    this.editorMsg = '';
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 400);
  }

  private focus() {
    if (this.messageInput && this.messageInput.nativeElement) {
      this.messageInput.nativeElement.focus();
    }
  }

  private setTextareaScroll() {
    const textarea = this.messageInput.nativeElement;
    textarea.scrollTop = textarea.scrollHeight;
  }

}
