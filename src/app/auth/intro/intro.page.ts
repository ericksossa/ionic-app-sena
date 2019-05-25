import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  slide: any = [
    {
      video: '../../../assets/inicio/trip.mp4',
      title: 'Welcome to awesome app',
      content: 'Each of us has a way of traveling. <br>Every sees the word in a special and unique way. '
    }
  ];
  constructor() { }

  ngOnInit() {
  }


}
