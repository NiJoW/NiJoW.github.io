import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  
  message:string;

  constructor() { }

  getMessage():Observable<string> {
    return new Observable<string>(observer => {
      observer.next(this.message);
    });
  }

  setMessage(message:string) {
    this.message = message;
    console.log("in service " + this.message);
  }

}
