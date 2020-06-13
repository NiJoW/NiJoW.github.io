import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  
  private messageSource = new BehaviorSubject<string>("");
  currentMessage = this.messageSource.asObservable();

  message:string;

  constructor() { }


  setMessage(message:string) {
    console.log(message);
    this.messageSource.next(message);
  }

}
