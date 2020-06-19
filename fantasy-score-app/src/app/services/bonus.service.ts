import { AuthService } from './auth.service';
import { Bonuseintrag } from './../models/Bonuseintrag';
import { APIConfig } from '../../APIconfig';
import { HttpClient , HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Bonusprogramm } from '../models/Bonusprogramm';

@Injectable({
    providedIn: 'root'
  })

  export class BonusService {
    constructor(private http: HttpClient, private authService: AuthService) {}

    private readonly bonusprogrammeUrl = APIConfig.URL + ':' + APIConfig.PORT + '/bonusprogramme';
    private readonly programmeVonKategorieUrl = APIConfig.URL + ':' + APIConfig.PORT + '/kategorie/bonusprogramme';
    private readonly erstellteBonusprogrammeUrl = APIConfig.URL + ':' + APIConfig.PORT + '/dashboard/erstellte-bonusprogramme';
    private readonly bonusSearchUrl = APIConfig.URL + ':' + APIConfig.PORT + '/bonusprogramme/suche';
    private readonly nutzerProfitiertUrl = APIConfig.URL + ':' + APIConfig.PORT + '/bonusprogramme/nutzer';
    private readonly bonusprogrammByIDUrl = APIConfig.URL + ':' + APIConfig.PORT + '/bonusByID';
    private readonly updateBonusprogrammUrl = APIConfig.URL + ':' + APIConfig.PORT + '/dashboard/bearbeite-bonusprogramm';
    private readonly createNewBonusprogrammUrl = APIConfig.URL + ':' + APIConfig.PORT + '/newBonusprogramm';

    getBonusprogramme(): Observable<Bonusprogramm[]> {
        console.log("Im service");
        return this.http.get<Bonusprogramm[]>(this.bonusprogrammeUrl);
    }
    getBonusprogrammeVonKategorie(kategorieID: number): Observable<Bonusprogramm[]> {
        let kategorieParams = new HttpParams().set("kategorieID", kategorieID+"");
        return this.http.get<Bonusprogramm[]>(this.programmeVonKategorieUrl, {params: kategorieParams});
    }
    getErstellteBonusprogramme(): Observable<Bonuseintrag[]> {
        let buergerParams = new HttpParams().set("buergerID", this.authService.getNutzer().id_buerger+"");
        return this.http.get<Bonuseintrag[]>(this.erstellteBonusprogrammeUrl, {params: buergerParams});
    }

    getSelbstErstellteBonusprogramme(): Observable<Bonusprogramm[]> {
      let buergerParams = new HttpParams().set("buergerID", this.authService.getNutzer().id_buerger+"");
      return this.http.get<Bonusprogramm[]>(this.erstellteBonusprogrammeUrl, {params: buergerParams});
  }

    getBonusprogrammeLike(searchInput: string): Observable<Bonusprogramm[]> {
        console.log(searchInput);
        let searchParams = new HttpParams().set("suche", searchInput);
        return this.http.get<Bonusprogramm[]>(this.bonusSearchUrl, {params: searchParams});
    }

    getBonusprogrammeVonNutzer(): Observable<Bonusprogramm[]> {
        console.log("Profitiere Ich?");
        let buergerParams = new HttpParams().set("buerger", this.authService.getNutzer().id_buerger+"");
        return this.http.get<Bonusprogramm[]>(this.nutzerProfitiertUrl, {params: buergerParams});
    }

    getBonusprogrammByID(bonusprogrammID: number): Observable<Bonusprogramm>  {
        let bonusprogrammParams = new HttpParams().set("bonusprogrammID", bonusprogrammID+"");
        return this.http.get<Bonusprogramm>(this.bonusprogrammByIDUrl, {params : bonusprogrammParams});
      }

      updateBonusprogramm(bonusprogramm: Bonusprogramm): Observable<Bonusprogramm>
    {
      return this.http.put<Bonusprogramm>(this.updateBonusprogrammUrl,
        {
          "name" : bonusprogramm.titel,
          "frist" : bonusprogramm.frist,
          "punkte_in_kategorie": bonusprogramm.punkte_in_kategorie,
          "nachricht": bonusprogramm.nachricht,
          "kategorieID": bonusprogramm.kategorieID,
          "id_bonusprogramm": bonusprogramm.id_bonusprogramm
        });
    }

    addBonusprogramm(bonusprogramm: Bonusprogramm)
    {
        return this.http.post<Bonusprogramm>(this.createNewBonusprogrammUrl,
          {
            "titel" : bonusprogramm.titel,
            "nachricht" : bonusprogramm.nachricht,
            "frist": bonusprogramm.frist,
            "punkte_in_kategorie": bonusprogramm.punkte_in_kategorie,
            "aeltesterID": bonusprogramm.aeltesterID,
            "kategorieID": bonusprogramm.kategorieID
          });
      }

  }