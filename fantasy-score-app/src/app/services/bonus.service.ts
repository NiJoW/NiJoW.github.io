import { AuthService } from './auth.service';
import { Bonuseintrag } from './../models/Bonuseintrag';
import { APIConfig } from '../../APIconfig';
import { HttpClient , HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Bonusprogramm } from '../models/Bonusprogramm';
import {Buerger} from "../models/Buerger";
import {BonusBenachrichtigung} from "../models/BonusBenachrichtigung";

@Injectable({
    providedIn: 'root'
  })

  export class BonusService {
    constructor(private http: HttpClient, private authService: AuthService) {}

    private readonly bonusprogrammeUrl = APIConfig.URL + ':' + APIConfig.PORT + '/bonusprogramme';
    private readonly bonusprogrammeNichtArchiviertUrl = APIConfig.URL + ':' + APIConfig.PORT + '/bonusprogrammNichtArchiviert';
    private readonly bonusprogrammeArchiviertUrl = APIConfig.URL + ':' + APIConfig.PORT + '/bonusprogrammArchiviert';
    private readonly programmeVonKategorieUrl = APIConfig.URL + ':' + APIConfig.PORT + '/kategorie/bonusprogramme';
    private readonly erstellteBonusprogrammeUrl = APIConfig.URL + ':' + APIConfig.PORT + '/dashboard/erstellte-bonusprogramme';
    private readonly bonusSearchUrl = APIConfig.URL + ':' + APIConfig.PORT + '/bonusprogramme/suche';
    private readonly nutzerBenachrichtigungBonusprogUngelesenUrl = APIConfig.URL + ':' + APIConfig.PORT + '/bonusNachricht/ungelesen/nutzer';
    private readonly nutzerBenachrichtigungBonusprogAlleUrl = APIConfig.URL + ':' + APIConfig.PORT + '/bonusNachricht/all/nutzer';
    private readonly bonusprogrammByIDUrl = APIConfig.URL + ':' + APIConfig.PORT + '/bonusByID';
    private readonly createNewBonusprogrammUrl = APIConfig.URL + ':' + APIConfig.PORT + '/newBonusprogramm';
    private readonly updateBonusprogrammUrl = APIConfig.URL + ':' + APIConfig.PORT + '/dashboard/bearbeite-bonusprogramm';
    private readonly tugendhafteErfuellenBonusprogrammUrl = APIConfig.URL + ':' + APIConfig.PORT + '/tugendhafteErfuellenBonusprogramm';
    private readonly newProfitiertVonBonusprogrammUrl = APIConfig.URL + ':' + APIConfig.PORT + '/newProfitiertVonBonusprogramm';
    private readonly setBenachrichtigungBonusGelesenUrl  = APIConfig.URL + ':' + APIConfig.PORT + '/setBenachrichtigungBonusGelesen';
    private readonly getBonusAnzahlUngelesenenBenachrichtigungenUrl  = APIConfig.URL + ':' + APIConfig.PORT + '/getBonusAnzahlUngelesenenBenachrichtigungen';
    private readonly archiviereUrl = APIConfig.URL + ':' + APIConfig.PORT + '/archiviereBonusprogramm'
    private readonly stelleHerUrl = APIConfig.URL + ':' + APIConfig.PORT + '/bonusprogrammWiederherstellen';

    getBonusprogramme(): Observable<Bonusprogramm[]> {
        console.log("Im service");
        return this.http.get<Bonusprogramm[]>(this.bonusprogrammeUrl);
    }
    
    getNichtArchivierteBonusprogramme():Observable<Bonusprogramm[]> {
      return this.http.get<Bonusprogramm[]>(this.bonusprogrammeNichtArchiviertUrl)
    }

    getArchivierteBonusprogramme(): Observable<Bonusprogramm[]> {
      return this.http.get<Bonusprogramm[]>(this.bonusprogrammeArchiviertUrl)
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
       // console.log(searchInput);
        let searchParams = new HttpParams().set("suche", searchInput);
        return this.http.get<Bonusprogramm[]>(this.bonusSearchUrl, {params: searchParams});
    }

    getBonusBenachrichtigungUngelesenFuerNutzer(): Observable<BonusBenachrichtigung[]> {
        console.log("Profitiere Ich? id_buerger: "+this.authService.getNutzer().id_buerger);

        let buergerParams = new HttpParams().set("buerger", this.authService.getNutzer().id_buerger+"");
        return this.http.get<BonusBenachrichtigung[]>(this.nutzerBenachrichtigungBonusprogUngelesenUrl, {params: buergerParams});
    }

    getBonusBenachrichtigungAlleFuerNutzer(): Observable<BonusBenachrichtigung[]> {
      console.log("Profitiere Ich? id_buerger: "+this.authService.getNutzer().id_buerger);

      let buergerParams = new HttpParams().set("buerger", this.authService.getNutzer().id_buerger+"");
      return this.http.get<BonusBenachrichtigung[]>(this.nutzerBenachrichtigungBonusprogAlleUrl, {params: buergerParams});
    }

    setBonusBenachrichtigungBonusGelesen(benachrichtigungs_id): Observable<BonusBenachrichtigung> {
      return this.http.put<BonusBenachrichtigung>(this.setBenachrichtigungBonusGelesenUrl, {
        "id_profitiert_von_bonusprogramm" : benachrichtigungs_id
      });
    }

    getBonusBenachrichtigungenUngelesen(): Observable<number> {
      let buergerParams = new HttpParams().set("buerger", this.authService.getNutzer().id_buerger+"");
      return this.http.get<number>(this.getBonusAnzahlUngelesenenBenachrichtigungenUrl, {params: buergerParams});
    }

  getTugendhafteErfuellenBonusprogramm(kategorie_id, min_punkte): Observable<Buerger[]> {
    let httpParams = new HttpParams().set("kategorie_id", kategorie_id+"").set("min_punkte", min_punkte+"");
    return this.http.get<Buerger[]>(this.tugendhafteErfuellenBonusprogrammUrl, {params : httpParams});
  }

  newProfitiertVonBonusprogrammEintragen(tugendhafte_id : number, bonusprogramm_id: number): Observable<any[]> {
    console.log('in bonusservice ' +tugendhafte_id + ' ' + bonusprogramm_id);
    return this.http.post<any[]>(this.newProfitiertVonBonusprogrammUrl,
      {
        "fk_buerger_id" : tugendhafte_id,
        "fk_bonusprogramm_id" : bonusprogramm_id
      });
  }
    getBonusprogrammByID(bonusprogrammID: number): Observable<Bonusprogramm>  {
        let bonusprogrammParams = new HttpParams().set("bonusprogrammID", bonusprogrammID+"");
        return this.http.get<Bonusprogramm>(this.bonusprogrammByIDUrl, {params : bonusprogrammParams});
    }

    addBonusprogramm(bonusprogramm: Bonusprogramm)
      {
          return this.http.post<Bonusprogramm>(this.createNewBonusprogrammUrl,
            {
              "titel" : bonusprogramm.titel,
              "nachricht" : bonusprogramm.nachricht,
              "punkte_in_kategorie": bonusprogramm.punkte_in_kategorie,
              "aeltesterID": bonusprogramm.aeltesterID,
              "kategorieID": bonusprogramm.kategorieID
            });
    }

    updateBonusprogramm(bonusprogramm: Bonusprogramm): Observable<Bonusprogramm>
    {
      return this.http.put<Bonusprogramm>(this.updateBonusprogrammUrl,
        {
          "titel" : bonusprogramm.titel,
          "punkte_in_kategorie": bonusprogramm.punkte_in_kategorie,
          "nachricht": bonusprogramm.nachricht,
          "kategorieID": bonusprogramm.kategorieID,
          "id_bonusprogramm": bonusprogramm.id_bonusprogramm
        });
    }

    archiviereBonusprogramm(id_bonusprogramm: number) :Observable<Bonusprogramm> {
      return this.http.put<Bonusprogramm>(this.archiviereUrl,
        {
          "id_bonusprogramm": id_bonusprogramm
        });
    }

    stelleBonusprogrammWiederHer(id_bonusprogramm: number) :Observable<Bonusprogramm> {
      return this.http.put<Bonusprogramm>(this.stelleHerUrl,
        {
          "id_bonusprogramm": id_bonusprogramm
        });
    }
  }
