import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NavParams, LoadingController, ModalController } from '@ionic/angular';

declare var mapboxgl: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  coord: string;
  constructor(
    private navParams: NavParams,
    protected modalController: ModalController,
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.coord = this.navParams.get('coords');
  }

  async ngAfterViewInit() {

    const loading = await this.loadingController.create({
      spinner: 'bubbles'
    });
    loading.present();
    const latLng = this.coord.split(',');
    const lat = Number(latLng[0]);
    const lng = Number(latLng[1]);

    mapboxgl.accessToken = 'pk.eyJ1Ijoic29zc2FlcmljayIsImEiOiJjanV4MGh5cHgwaWlmNGVzMWNybXdibDVhIn0.5lR_Jwq524qzkrseKOtuJA';
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/sossaerick/cjux09jib0aha1frtzog23s39',
      center: [lng, lat], // starting position
      zoom: 15 // starting zoom
    }).on('load', () => {
      map.resize();
      loading.dismiss();
    });

    // marcador
    const marker = new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .addTo(map);

    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl());
  }

}
