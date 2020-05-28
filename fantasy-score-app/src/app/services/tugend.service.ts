import { APIConfig } from './../../APIconfig';
import { Tugend } from './../models/Tugend';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
  })

  export class TugendService {
      constructor(private http: HttpClient) {}

  private readonly tugendenUrl = APIConfig.URL + ':' + APIConfig.PORT + '/tugend';
  private readonly erfuellteTugendenUrl = APIConfig.URL + ':' + APIConfig.PORT + '/dashboard/erfuellte-tugenden';
  private readonly todoTugendenUrl = APIConfig.URL + ':' + APIConfig.PORT + '/dashboard/todo-tugenden';



      getErfuellteTugenden(): Observable<Tugend[]> {
          return this.http.get<Tugend[]>(this.erfuellteTugendenUrl)
      }

      getTodoTugenden(): Observable<Tugend[]> {
        return this.http.get<Tugend[]>(this.todoTugendenUrl)
     }

     // TODO
    addTugend(tugend: Tugend): Observable<Tugend>
    { const httpOptions = null;
      console.log('in service add tugend');
      console.dir(tugend);
      console.log(tugend.kategorieID);
      return this.http.post<Tugend>(this.tugendenUrl,
        {
        /*  "name" : tugend.name,
          "beschreibung" : tugend.beschreibung,
          "wert": tugend.wert,
          "benoetigteWdh": tugend.benoetigteWdh,
          "aeltesterID": tugend.aeltesterID,
          "kategorieID": tugend.kategorieID*/
          "name" : tugend.name,
          "beschreibung" : tugend.beschreibung,
          "wert": tugend.wert,
          "benoetigteWdh": tugend.benoetigteWdh,
          "aeltesterID": tugend.aeltesterID,
          "kategorieID": tugend.kategorieID
        });
    }

}
