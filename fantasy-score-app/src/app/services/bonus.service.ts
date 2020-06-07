import { AuthService } from './auth.service';
import { Bonuseintrag } from './../models/Bonuseintrag';
import { APIConfig } from '../../APIconfig';
import { HttpClient , HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })

  export class BonusService {
      constructor(private http: HttpClient, private authService: AuthService) {}

      private readonly erstellteBonusprogrammeUrl = APIConfig.URL + ':' + APIConfig.PORT + '/dashboard/erstellte-bonusprogramme';

      getErstellteBonusprogramme(): Observable<Bonuseintrag[]> {
          let buergerParams = new HttpParams().set("buergerID", this.authService.getNutzer().id_buerger+"");
          return this.http.get<Bonuseintrag[]>(this.erstellteBonusprogrammeUrl, {params: buergerParams});
      }
  }