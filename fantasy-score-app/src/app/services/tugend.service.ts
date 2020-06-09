import { AuthService } from 'src/app/services/auth.service';
import { APIConfig } from './../../APIconfig';
import { Tugend } from './../models/Tugend';
import { HttpClient , HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
  })

  export class TugendService {
      constructor(private http: HttpClient, private authService: AuthService) {}

  private readonly tugendenUrl = APIConfig.URL + ':' + APIConfig.PORT + '/tugend';
  private readonly tugendVonKategorieUrl = APIConfig.URL + ':' + APIConfig.PORT + '/tugenden';
  private readonly erfuellteTugendenUrl = APIConfig.URL + ':' + APIConfig.PORT + '/dashboard/erfuellte-tugenden';
  private readonly todoTugendenUrl = APIConfig.URL + ':' + APIConfig.PORT + '/dashboard/todo-tugenden';
  // Aeltester
  private readonly createNewTugendenUrl = APIConfig.URL + ':' + APIConfig.PORT + '/newTugend';
  private readonly erstellteTugendenUrl = APIConfig.URL + ':' + APIConfig.PORT + '/dashboard/erstellte-tugenden';

    getTugenden(): Observable<Tugend[]> {
      return this.http.get<Tugend[]>(this.tugendenUrl)
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
      return this.http.post<Tugend>(this.createNewTugendenUrl,
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

}
