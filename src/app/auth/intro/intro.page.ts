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
      title: 'Hi! where are we going today?',
      content: 'Each of us has a way of traveling. <br>We all see the word in a unique and special way. '
    }
  ];
  constructor() { }

  ngOnInit() {
  }


}
