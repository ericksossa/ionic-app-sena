import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  slide: any = [
    {
      video: '../../../assets/inicio/trip.mp4',
      title: 'Welcome a my awesome app',
      content: 'Each of us has a way of traveling. <br>Every sees the word in a special and unique way. '
    }
  ];
  constructor(private router: Router) { }

  ngOnInit() {
  }

  

}
