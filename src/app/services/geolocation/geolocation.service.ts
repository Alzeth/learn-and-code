import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { GEO_API_KEY, GEO_API_URL } from 'app/services/api.config';
import { IGeolocationResponse } from 'app/services/interfaces';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  private http = inject(HttpClient);
  private geoApiKey = inject(GEO_API_KEY);
  private geoApiUrl = inject(GEO_API_URL);

  getGeolocation(): Observable<IGeolocationResponse> {
    const url = `${this.geoApiUrl}?&apiKey=${this.geoApiKey}`;

    return this.http.get<IGeolocationResponse>(url).pipe(map((res) => res));
  }
}
