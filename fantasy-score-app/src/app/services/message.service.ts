import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  
  private messageSource = new BehaviorSubject([]);
  currentMessage = this.messageSource.asObservable();

  message:string;

  constructor() { }


  setMessage(message:string, typ: boolean) {
    console.log(message);
    this.messageSource.next([message, typ]);
  }

}
