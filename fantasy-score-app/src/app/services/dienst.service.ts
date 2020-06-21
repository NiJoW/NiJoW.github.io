import { APIConfig } from './../../APIconfig';
import { Dienst } from './../models/Dienst';
import { AuthService } from './auth.service';
import { HttpClient , HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })

  export class DienstService {
      constructor(private http: HttpClient, private authService: AuthService) {}

      private readonly diensteUrl = APIConfig.URL + ':' + APIConfig.PORT + '/dienste';
      private readonly dienstUrl = APIConfig.URL + ':' + APIConfig.PORT + '/dienst';
      private readonly angeboteneDiensteUrl = APIConfig.URL + ':' + APIConfig.PORT + '/dashboard/angebotene-dienste';
      private readonly erledigteDiensteUrl = APIConfig.URL + ':' + APIConfig.PORT + '/dashboard/erledigte-dienste';
      private readonly geplanteDiensteUrl = APIConfig.URL + ':' + APIConfig.PORT + '/dashboard/geplante-dienste';
      private readonly gebuchteDiensteUrl = APIConfig.URL + ':' + APIConfig.PORT + '/dashboard/gebuchte-dienste';
      private readonly angefragteDiensteUrl = APIConfig.URL + ':' + APIConfig.PORT + '/dashboard/angefragte-dienste';
      private readonly diensteInKategorieUrl = APIConfig.URL + ':' + APIConfig.PORT + '/kategorie/dienste';
      private readonly dienstSuchUrl = APIConfig.URL + ':' + APIConfig.PORT + '/dienste/suche';
      private readonly newDienstVertragUrl = APIConfig.URL + ':' + APIConfig.PORT + '/newDienstVertrag';
      private readonly angefragenUrl = APIConfig.URL + ':' + APIConfig.PORT + '/anfragenAnTugendhafter';
      private readonly updateVertragsUrl = APIConfig.URL + ':' + APIConfig.PORT + '/updateDienstvertrag';
      private readonly createNewDienstUrl = APIConfig.URL + ':' + APIConfig.PORT + '/newDienst';
      private readonly updateDienstUrl = APIConfig.URL + ':' + APIConfig.PORT + '/dashboard/bearbeite-dienst';

      getDienste(): Observable<Dienst[]> {
        return this.http.get<Dienst[]>(this.diensteUrl);
      }

      getDienstByID(id: number): Observable<Dienst> {
        let dienstParams = new HttpParams().set("dienstID", id+"");
        return this.http.get<Dienst>(this.dienstUrl, {params : dienstParams});
      }

      getDiensteInKategorie(kategorieID: number): Observable<Dienst[]> {
        let kategorieParams = new HttpParams().set("kategorieID", kategorieID+""); 
         return this.http.get<Dienst[]>(this.diensteInKategorieUrl, {params : kategorieParams});
      }

      getDiensteLike(suchInput: string): Observable<Dienst[]> {
        let searchParams = new HttpParams().set("suche", suchInput);
        return this.http.get<Dienst[]>(this.dienstSuchUrl, {params: searchParams});
      }

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

      getAnfragenAnTugendhaften(): Observable<Dienst[]> {
        let buergerParams = new HttpParams().set("buergerID", this.authService.getNutzer().id_buerger+"");
        return this.http.get<Dienst[]>(this.angefragenUrl, {params : buergerParams});
      }

      createDiensvertrag(dienstID: number, datum: Date): Observable<Dienst> {
        console.log(datum);
        return this.http.post<Dienst>(this.newDienstVertragUrl,
          {
            "dienstID" : dienstID,
            "suchenderID" : this.authService.getNutzer().id_buerger,
            "datum": datum
          });
      }

      addDienst(dienst: Dienst): Observable<Dienst> {
        return this.http.post<Dienst>(this.createNewDienstUrl,
          {
            "name": dienst.name,
            "beschreibung": dienst.beschreibung,
            "tugendhafterID": dienst.tugendhafterID,
            "kategorieID": dienst.kategorieID
          });
      }

      updateDienst(dienst: Dienst): Observable<Dienst>
      {
        console.log(dienst.name, dienst.beschreibung, dienst.kategorieID, dienst.id_dienstangebot);
        return this.http.put<Dienst>(this.updateDienstUrl,
          {
            "name" : dienst.name,
            "beschreibung" : dienst.beschreibung,
            "kategorieID": dienst.kategorieID,
            "id_dienstangebot": dienst.id_dienstangebot
          });
      }

      bestaetigeVertrag(dienstID: number, status: string ): Observable<Dienst> {
        return this.http.put<Dienst>(this.updateVertragsUrl,
          {
            "dienstID" : dienstID,
            "status" : status
          });
      }

    }

    