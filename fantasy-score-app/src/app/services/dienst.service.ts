import { APIConfig } from '../../APIconfig';
import { Dienst } from '../models/Dienst';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })

  export class DienstService {
      constructor(private http: HttpClient) {}

      private readonly angeboteneDiensteUrl = APIConfig.URL + ':' + APIConfig.PORT + '/dashboard/angebotene-dienste';
      private readonly erledigteDiensteUrl = APIConfig.URL + ':' + APIConfig.PORT + '/dashboard/erledigte-dienste';
      private readonly geplanteDiensteUrl = APIConfig.URL + ':' + APIConfig.PORT + '/dashboard/geplante-dienste';

      getAngeboteneDienste(): Observable<Dienst[]> {
          return this.http.get<Dienst[]>(this.angeboteneDiensteUrl);
      }

      getErledigteDienste(): Observable<Dienst[]> {
            return this.http.get<Dienst[]>(this.erledigteDiensteUrl);
      }

      getGeplanteDienste(): Observable<Dienst[]> {
            return this.http.get<Dienst[]>(this.geplanteDiensteUrl);
      }
    }