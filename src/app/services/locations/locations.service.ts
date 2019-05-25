import { Injectable } from '@angular/core';
import { Jsonp, Headers } from '@angular/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  private urlCities = 'http://gd.geobytes.com/AutoCompleteCity?callback=JSONP_CALLBACK&q=';
  constructor(private http: Jsonp) { }

  getCities(term: any) {
    let url = `${this.urlCities}${term}`;
    let headers = new Headers({ 'X-Mashape-Key': 'Ns0SkjyRRomshq3PgEnGoz2Zkc71p1CYnWajsnphGctvrGt46W' });
    headers.append('Accept', 'application/json');
    return this.http.get(url, { headers: headers })
      .pipe(map(res => res));
  }
}
