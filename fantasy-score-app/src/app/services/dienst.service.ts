import { Dienst } from './../models/Dienst';
import { AuthService } from './auth.service';
import { APIConfig } from '../../APIconfig';
import { HttpClient , HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })

  export class DienstService {
      constructor(private http: HttpClient, private authService: AuthService) {}

      private readonly angeboteneDiensteUrl = APIConfig.URL + ':' + APIConfig.PORT + '/dashboard/angebotene-dienste';
      private readonly erledigteDiensteUrl = APIConfig.URL + ':' + APIConfig.PORT + '/dashboard/erledigte-dienste';
      private readonly geplanteDiensteUrl = APIConfig.URL + ':' + APIConfig.PORT + '/dashboard/geplante-dienste';
      private readonly gebuchteDiensteUrl = APIConfig.URL + ':' + APIConfig.PORT + '/dashboard/gebuchte-dienste';
      private readonly angefragteDiensteUrl = APIConfig.URL + ':' + APIConfig.PORT + '/dashboard/angefragte-dienste';

      getAngeboteneDienste(): Observable<Dienst[]> {
            let buergerParams = new HttpParams().set("buergerID", this.authService.getNutzer().id_buerger+"");
          return this.http.get<Dienst[]>(this.angeboteneDiensteUrl, {params : buergerParams});
      }

      getErledigteDienste(): Observable<Dienst[]> {
            let buergerParams = new HttpParams().set("buergerID", this.authService.getNutzer().id_buerger+"");
          return this.http.get<Dienst[]>(this.erledigteDiensteUrl, {params : buergerParams});
      }

      getGeplanteDienste(): Observable<Dienst[]> {
            let buergerParams = new HttpParams().set("buergerID", this.authService.getNutzer().id_buerger+"");
          return this.http.get<Dienst[]>(this.geplanteDiensteUrl, {params : buergerParams});
      }

      getGebuchteDienste(): Observable<Dienst[]> {
            let buergerParams = new HttpParams().set("buergerID", this.authService.getNutzer().id_buerger+"");
          return this.http.get<Dienst[]>(this.gebuchteDiensteUrl, {params : buergerParams});
      }
      
      getAngefragteDienste(): Observable<Dienst[]> {
            let buergerParams = new HttpParams().set("buergerID", this.authService.getNutzer().id_buerger+"");
          return this.http.get<Dienst[]>(this.angefragteDiensteUrl, {params : buergerParams});
      }
    }