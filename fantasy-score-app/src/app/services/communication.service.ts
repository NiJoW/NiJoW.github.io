import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs/Rx";
import { WebsocketService } from "./websocket.service";

const COMMUNICATION_URL =  "ws://echo.websocket.org/";



@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  messages: Subject<any>;

  // Our constructor calls our wsService connect method
  constructor(private wsService: WebsocketService) {
    this.messages = <Subject<any>>wsService
      .connect()
      .map((response: any): any => {
        return response;
      })
  }

  // Our simplified interface for sending
  // messages back to our socket.io server
  sendMsg(msg) {
    this.messages.next(msg);
  }
/*
  constructor(wsService: WebsocketService) {
    this.messages = <Subject<Message>>wsService.connect(COMMUNICATION_URL).map(
      (response: MessageEvent): Message => {
        let data = JSON.parse(response.data);
        return {
          author: data.author,
          message: data.message
        };
      }
    );
  }*/
}
