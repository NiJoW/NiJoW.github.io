import {Observable} from "rxjs";
import {Taetigkeit} from "../models/Taetigkeit";
import {HttpClient, HttpParams} from "@angular/common/http";
import {APIConfig} from "../../APIconfig";
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {Tugend} from "../models/Tugend";


@Injectable({
  providedIn: 'root'
})

export class TaetigkeitService {
  constructor(private http: HttpClient, private authService: AuthService) {
  }

  private readonly todoTugendenUrl = APIConfig.URL + ':' + APIConfig.PORT + '/dashboard/todo-tugenden';
  private readonly setErfuellteWdhTaetigkeit  = APIConfig.URL + ':' + APIConfig.PORT + '/dashboard/set-erfuellte-wdh-taetigkeit';
  private readonly taetigkeitPruefenUrl = APIConfig.URL + ':' + APIConfig.PORT + '/taetigkeit/nutzer/tugend';

  getTaetigkeitByUserID(): Observable<Taetigkeit[]> {
    let buergerParams = new HttpParams().set("buergerID", this.authService.getNutzer().id_buerger + "");
    return this.http.get<Taetigkeit[]>(this.todoTugendenUrl, {params: buergerParams});
  }

  getTaetigkeitByTugendIdVonNutzer(tugendId: number): Observable<Taetigkeit[]> {
    //let tugendParams = new HttpParams().set("tugendId", tugendId + "");
    //let buergerParams = new HttpParams().set("buergerId", this.authService.getNutzer().id_buerger + "");s

    return this.http.post<Taetigkeit[]>(this.taetigkeitPruefenUrl, 
      {
        "tugendId": tugendId,
        "buergerId": this.authService.getNutzer().id_buerger
      });
  }

  increaseErfuellteWdhTaetigkeit(id_taetigkeit, erhoehteWdh) {
    console.log(id_taetigkeit, erhoehteWdh);
    let result =  this.http.post<any>(this.setErfuellteWdhTaetigkeit,
      {
        "id_taetigkeit" : id_taetigkeit,
        "erfuellteWdh" : erhoehteWdh
      });
    return result;
  }
}
