import { AuthService } from 'src/app/services/auth.service';
import { APIConfig } from './../../APIconfig';
import { Tugend } from './../models/Tugend';
import { HttpClient , HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, retry } from 'rxjs/operators';
import {Dienst} from "../models/Dienst";


@Injectable({
    providedIn: 'root'
  })

  export class TugendService {
      constructor(private http: HttpClient, private authService: AuthService) {}

  private readonly tugendenUrl = APIConfig.URL + ':' + APIConfig.PORT + '/tugend';
  private readonly tugendByIDUrl = APIConfig.URL + ':' + APIConfig.PORT + '/tugendByID';
  private readonly newTaetigkeitUrl = APIConfig.URL + ':' + APIConfig.PORT + '/newTaetigkeit'; // (vorher planeTugendUrl)
  private readonly tugendVonKategorieUrl = APIConfig.URL + ':' + APIConfig.PORT + '/tugenden';
  private readonly erfuellteTugendenUrl = APIConfig.URL + ':' + APIConfig.PORT + '/dashboard/erfuellte-tugenden';
  private readonly todoTugendenUrl = APIConfig.URL + ':' + APIConfig.PORT + '/dashboard/todo-tugenden';
  // Aeltester
  private readonly createNewTugendUrl = APIConfig.URL + ':' + APIConfig.PORT + '/newTugend';
  private readonly erstellteTugendenUrl = APIConfig.URL + ':' + APIConfig.PORT + '/dashboard/erstellte-tugenden';
  private readonly updateTugendUrl = APIConfig.URL + ':' + APIConfig.PORT + '/dashboard/bearbeite-tugend';

    getTugenden(): Observable<Tugend[]> {
      return this.http.get<Tugend[]>(this.tugendenUrl)
    }

  // get eine bestimmte Tugend anhand ihrer ID (Tugend, nicht Tätigkeit)
    getTugendByID(tugendID: number): Observable<Tugend>  {
      let tugendParams = new HttpParams().set("tugendID", tugendID+"");
      return this.http.get<Tugend>(this.tugendByIDUrl, {params : tugendParams});
    }

    // newTaetigkeit (vorher planeTugendUrl)
    planeTugend(tugendID: number): Observable<Tugend> {
      return this.http.post<Tugend>(this.newTaetigkeitUrl,
        {
          "tugendID" : tugendID,
          "tugendhafterID": this.authService.getNutzer().id_buerger
        });
    }

      getErfuellteTugenden(): Observable<Tugend[]> {
        let buergerParams = new HttpParams().set("buergerID", this.authService.getNutzer().id_buerger+"");
          return this.http.get<Tugend[]>(this.erfuellteTugendenUrl, {params : buergerParams});
      }

      getTodoTugenden(): Observable<Tugend[]> {
        let buergerParams = new HttpParams().set("buergerID", this.authService.getNutzer().id_buerger+"");
          return this.http.get<Tugend[]>(this.todoTugendenUrl, {params : buergerParams});
     }

     getTugendVonKategorie(kategorieID: number): Observable<Tugend[]> {
      console.log('in service get Tugenden');
      console.dir(kategorieID);
      let kategorieParams = new HttpParams().set("kategorieID", kategorieID+""); //TODO: added immer ein %20
       return this.http.get<Tugend[]>(this.tugendVonKategorieUrl, {params : kategorieParams});
     }

     //Aeltester

    addTugend(tugend: Tugend): Observable<Tugend>
    {
      return this.http.post<Tugend>(this.createNewTugendUrl,
        {
          "name" : tugend.name,
          "beschreibung" : tugend.beschreibung,
          "wert": tugend.wert,
          "benoetigteWdh": tugend.benoetigteWdh,
          "aeltesterID": tugend.aeltesterID,
          "kategorieID": tugend.kategorieID
        });
    }

    getErstellteTugenden(): Observable<Tugend[]> {
      let aeltesterIDParams = new HttpParams().set("aeltesterID", this.authService.getNutzer().id_buerger+"");
      return this.http.get<Tugend[]>(this.erstellteTugendenUrl, {params : aeltesterIDParams});
    }

    updateTugend(tugend: Tugend): Observable<Tugend>
    {
      return this.http.put<Tugend>(this.updateTugendUrl,
        {
          "name" : tugend.name,
          "beschreibung" : tugend.beschreibung,
          "wert": tugend.wert,
          "benoetigteWdh": tugend.benoetigteWdh,
          "kategorieID": tugend.kategorieID,
          "id_tugend": tugend.id_tugend
        });
    }

}
