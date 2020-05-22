import { APIConfig } from '../../APIconfig';
import { Kategorie } from '../models/Kategorie';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })

  export class KategorieService {
      constructor(private http: HttpClient) {}

      private readonly kategorieUrl = APIConfig.URL + ':' + APIConfig.PORT + '/kategorie';

      getKategorien(): Observable<Kategorie[]> {
          return this.http.get<Kategorie[]>(this.kategorieUrl);
      }
    }
