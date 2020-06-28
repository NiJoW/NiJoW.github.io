import { APIConfig } from '../../../APIconfig';
import { AuthService } from 'src/app/services/utility/auth.service';
import { Kategorie } from '../../models/Kategorie';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })

  export class KategorieService {
      constructor(private http: HttpClient,
                  private authService: AuthService) {}

      private readonly kategorieUrl = APIConfig.URL + ':' + APIConfig.PORT + '/kategorie';
      private readonly kategorieByIDUrl = APIConfig.URL + ':' + APIConfig.PORT + '/kategorieByID';
      private readonly erstellteKategorienUrl = APIConfig.URL + ':' + APIConfig.PORT + '/erstellteKategorien';
      private readonly createNewKategorieUrl = APIConfig.URL + ':' + APIConfig.PORT + '/addKategorie';
      private readonly updateKategorieUrl = APIConfig.URL + ':' + APIConfig.PORT + '/updateKategorie';

      getKategorien(): Observable<Kategorie[]> {
          return this.http.get<Kategorie[]>(this.kategorieUrl);
      }

      getKategorieByID(kategorieID: number): Observable<Kategorie>  {
        let kategorieParams = new HttpParams().set("kategorieID", kategorieID+"");
        return this.http.get<Kategorie>(this.kategorieByIDUrl, {params : kategorieParams});
      }

      getErstellteKategorien(): Observable<Kategorie[]> {
        let aeltesterIDParams = new HttpParams().set("aeltesterID", this.authService.getNutzer().id_buerger+"");
          return this.http.get<Kategorie[]>(this.erstellteKategorienUrl, {params : aeltesterIDParams});
      }

      addKategorie(kategorie: Kategorie): Observable<Kategorie>
      {
        return this.http.post<Kategorie>(this.createNewKategorieUrl,
          {
            "bezeichnung" : kategorie.bezeichnung,
            "aeltesterID": kategorie.aeltesterID
          });
      }

      updateKategorie(kategorie: Kategorie): Observable<Kategorie>
      {
        return this.http.put<Kategorie>(this.updateKategorieUrl,
          {
            "bezeichnung" : kategorie.bezeichnung,
            "id_kategorie": kategorie.id_kategorie
          });
      }
    }
