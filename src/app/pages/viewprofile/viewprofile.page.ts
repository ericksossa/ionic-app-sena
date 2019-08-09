import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonSegment, ModalController, AlertController } from '@ionic/angular';
import { MapComponent } from '../../components/modals/map/map.component';
import { UsersService } from '../../services/users/users.service';


@Component({
  selector: 'app-viewprofile',
  templateUrl: './viewprofile.page.html',
  styleUrls: ['./viewprofile.page.scss'],
})
export class ViewprofilePage implements OnInit {
  @ViewChild(IonSegment, { static: true }) segment: IonSegment;
  args: any;
  galleryType = 'grid';
  start = 'star-outline';
  likes: number = 0;
  dataUser: any;
  userAvatar: any = '';
  userName: string;
  location: string;
  languages: string;
  description: string;
  items: any[] = [];
  constructor(
    private alertController: AlertController,
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private usersService: UsersService) {
    this.activatedRoute.paramMap
      .subscribe(param => {
        this.args = param.get('value');
      });
  }

  ngOnInit() {
    // valor por defecto del IonSegment
    this.segment.value = 'grid';
    this.getUser();
    this.getUserPost();
  }

  verifyAvatar(img: string) {
    if (img.indexOf('av') > -1) {
      this.userAvatar = 'assets/inicio/' + img;
    } else {
      this.userAvatar = img;
    }

  }

  getUser() {
    this.usersService.getUser(this.args)
      .subscribe((data: any) => {
        this.dataUser = data;
        this.userName = data[0].name;
        this.location = data[0].location;
        this.languages = data[0].languages;
        this.description = data[0].description;
        this.verifyAvatar(data[0].avatar);
      });
  }

  getUserPost() {
    this.usersService.getUserProfilePost(this.args)
      .subscribe((coleccion: any[]) => this.items = coleccion);
  }

  segmentChanged(e) {
    this.galleryType = e.detail.value;
  }

  likePost() {
    this.likes++;
    if (this.likes <= 1) {
      this.start = 'star';
      console.log('Like');

    } else {
      this.start = 'star-outline';
      this.likes = 0;
      console.log('Unlike');
      return;
    }
    return;
  }

  async openMap(coords: string) {
    if (!coords) {
      const alert = await this.alertController.create({
        header:   `I'm sorry`,
        message: `Apparently there's no map to show.`,
        buttons: ['OK'],
        mode: 'ios'
      });
      await alert.present();
      return;
    }

    const modal = await this.modalController.create({
      component: MapComponent,
      componentProps: { coords: coords }
    });
    return await modal.present();

  }

}
