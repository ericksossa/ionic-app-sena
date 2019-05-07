import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  private urlCities = 'http://gd.geobytes.com/AutoCompleteCity?callback=?&q=';
  constructor(private jsonp: Jsonp) { }

  getCities(term: any) {
    let url = `${this.urlCities}${term}`;

    return this.jsonp.get(url)
      .pipe(map(res => res.json));
  }

}
