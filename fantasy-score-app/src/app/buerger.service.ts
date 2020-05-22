import { Bester } from './models/Bester';
import { APIConfig } from './../APIconfig';
import { Buerger } from './models/Buerger';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class BuergerService {
    constructor(private http: HttpClient) {}

    private readonly buergerUrl = APIConfig.URL + ':' + APIConfig.PORT + '/buerger';
    private readonly bestenlisteUrl = APIConfig.URL + ':' + APIConfig.PORT + '/bestenliste';

  

    getBuerger(): Observable<Buerger[]> {
        return this.http.get<Buerger[]>(this.buergerUrl)
    }

    getBestenliste(): Observable<Bester[]> {
        return this.http.get<Bester[]>(this.bestenlisteUrl)
    }

   
    // Make the HTTP request:
  //  this.http.get('http://localhost:port/assets/data.json')
    //         .subscribe(data => console.log(data));
}