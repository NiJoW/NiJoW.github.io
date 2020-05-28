import { APIConfig } from './../../APIconfig';
import { Tugend } from './../models/Tugend';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
  
  export class TugendService {
      constructor(private http: HttpClient) {}
  
      private readonly erfuellteTugendenUrl = APIConfig.URL + ':' + APIConfig.PORT + '/dashboard/erfuellte-tugenden';
      private readonly todoTugendenUrl = APIConfig.URL + ':' + APIConfig.PORT + '/dashboard/todo-tugenden';
  
    
  
      getErfuellteTugenden(): Observable<Tugend[]> {
          return this.http.get<Tugend[]>(this.erfuellteTugendenUrl)          
      }

      getTodoTugenden(): Observable<Tugend[]> {
        return this.http.get<Tugend[]>(this.todoTugendenUrl)
    }
    }