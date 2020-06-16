import { Observable } from 'rxjs';
import { Bester } from './../models/Bester';
import { APIConfig } from './../../APIconfig';
import { Buerger } from './../models/Buerger';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Tugend} from "../models/Tugend";

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


    getBuerger(): Observable<Buerger[]> {
        return this.http.get<Buerger[]>(this.buergerUrl)
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

















    // Make the HTTP request:
  //  this.http.get('http://localhost:port/assets/data.json')
    //         .subscribe(data => console.log(data));

}
