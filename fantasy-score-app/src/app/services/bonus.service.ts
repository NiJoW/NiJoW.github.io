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
    private readonly bonusSearchUrl = APIConfig.URL + ':' + APIConfig.PORT + '/bonusprogramm/suche';

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

    getBonusprogrammeLike(_searchInput: string): Observable<Bonusprogramm[]> {
        let searchParams = new HttpParams().set("suche", _searchInput);
        return this.http.get<Bonusprogramm[]>(this.bonusSearchUrl, {params: searchParams});
    }

  }