import { Observable } from 'rxjs';
import { Bester } from './../models/Bester';
import { APIConfig } from './../../APIconfig';
import { Buerger } from './../models/Buerger';
import { HttpClient , HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class BuergerService {
    constructor(private http: HttpClient) {}

    private readonly buergerUrl = APIConfig.URL + ':' + APIConfig.PORT + '/buerger';
    private readonly newBuergerUrl = APIConfig.URL + ':' + APIConfig.PORT + '/nutzer/registrieren';
    private readonly bestenlisteUrl = APIConfig.URL + ':' + APIConfig.PORT + '/bestenliste';
    private readonly aeltesterUrl = APIConfig.URL + ':' + APIConfig.PORT + '/aeltester';
    private readonly loginUrl = APIConfig.URL + ':' + APIConfig.PORT + '/nutzer/login';
    private readonly nutzerNameUrl = APIConfig.URL + ':' + APIConfig.PORT + '/nutzer/name';
    private readonly newSocialScoreEintragUrl = APIConfig.URL + ':' + APIConfig.PORT + '/nutzer/socialScoreEintrag';
    private readonly unlockTugendhafterUrl = APIConfig.URL + ':' + APIConfig.PORT + '/nutzer/unlockTugendhafter';
    private readonly socialScoreUrl = APIConfig.URL + ':' + APIConfig.PORT + '/nutzer/socialScore';
    private readonly updateNutzerUrl = APIConfig.URL + ':' + APIConfig.PORT + '/nutzer/updateDaten';

    getBuerger(): Observable<Buerger[]> {
        return this.http.get<Buerger[]>(this.buergerUrl)
    }

    getSocialScoreFromId(id: number): Observable<number> {
      let buergerParams =  new HttpParams().set("buergerID", id+"");
      return this.http.get<number>(this.socialScoreUrl, {params: buergerParams})
    } 

    getBestenliste(): Observable<Bester[]> {
        return this.http.get<Bester[]>(this.bestenlisteUrl)
    }

    getAeltester(): Observable<Buerger[]> {
      return this.http.get<Buerger[]>(this.aeltesterUrl)
  }

  getBuergerByLoginData(benutzername: string, passwort: string): Observable<Buerger[]> {
    return this.http.post<Buerger[]>(this.loginUrl,
      {
        "benutzername" : benutzername,
        "passwort" : passwort
      });
  }

  getBuergerByBenutzername(benutzername: string): Observable<Buerger[]> {
    return this.http.post<Buerger[]>(this.nutzerNameUrl,
      {
        "benutzername" : benutzername,
      });
  }

  addBuerger(buerger: Buerger): Observable<Buerger[]> { 
    const httpOptions = null;
    console.log('In buerger.service.ts addBuerger');
    console.dir(buerger);
    return this.http.post<Buerger[]>(this.newBuergerUrl,
      {
        "benutzername" : buerger.benutzername,
        "passwort": buerger.passwort,
        "email_adresse" : buerger.email_adresse,
        "typ": buerger.typ,
      });
    }

    newSocialScoreAnlegen(id: number): Observable<Buerger[]> {
    const httpOptions = null;
    console.log('In buerger.service.ts newSocialScoreAnlegen');
    console.log("InsertID in newSocialScoreAnlegen" + id);
    return this.http.post<Buerger[]>(this.newSocialScoreEintragUrl,
      {
        "tugendhafterID" : id,
      });
    }

    unlockTugendhafter(id: number): Observable<Buerger> {
      const httpOptions = null;
      return this.http.put<Buerger>(this.unlockTugendhafterUrl,
        {
          "id_buerger": id
        });
    }

    updateNutzer(email: string, passwort:string, id:number): Observable<Buerger> {
      return this.http.put<Buerger>(this.updateNutzerUrl, 
        {
          "email": email,
          "passwort": passwort,
          "buergerID": id
        });
    }







    // Make the HTTP request:
  //  this.http.get('http://localhost:port/assets/data.json')
    //         .subscribe(data => console.log(data));

}
 