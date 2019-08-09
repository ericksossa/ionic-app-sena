import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController, NavParams, IonContent } from '@ionic/angular';
import { ChatService } from 'src/app/services/chat/chat.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-chat-details',
  templateUrl: './chat-details.page.html',
  styleUrls: ['./chat-details.page.scss'],
})
export class ChatDetailsPage implements OnInit {
  @ViewChild(IonContent, { static: true }) content: IonContent;
  @ViewChild('chat_input', { static: true }) messageInput: ElementRef;
  showEmojiPicker = false;
  editorMsg: any = '';
  msgList: any[] = [];
  name: string;
  auth: any;
  chat: any;
  toUserId: string;
  userAvatar: any;
  subscription: Subscription;
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private chatService: ChatService,
    private store: Store<AppState>) {
    this.subscription = this.store.select('auth')
      .pipe(filter(auth => auth.user != null))
      .subscribe(auth => {
        this.auth = auth.user;
        console.log(this.auth);
      });
    this.verifyAvatar(this.auth.avatar);
  }

  ngOnInit() {
    this.chat = this.navParams.get('chat');
    this.toUserId = this.chat.uid;
    this.getChat();
    console.log(this.chat);
  }

  verifyAvatar(img: string) {
    if (img.indexOf('av') > -1) {
      this.userAvatar = 'assets/inicio/' + img;
    } else {
      this.userAvatar = img;
    }

  }

  getChat() {
    this.chatService.get(this.toUserId)
      .subscribe((data: any) => {
        this.msgList = data.messages;
        console.log(this.msgList);
      });
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
    const newMsg: any = {
      // messageId: Date.now().toString(),
      userId: this.auth.uid,
      toUserId: this.toUserId,
      userName: this.auth.name,
      time: Date.now(),
      messages: this.editorMsg,
    };

    // this.msgList.push(newMsg);
    this.editorMsg = '';
    this.chatService.sendMsgToFirebase(newMsg, this.toUserId);
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
