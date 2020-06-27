import {Injectable} from "@angular/core";

const SOCKET_ENDPOINT = 'localhost:8080';
import * as io from 'socket.io-client';
import {MessageService} from "./message.service";
import {DoUpdateService} from "./do-update.service";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  socket;
  message: string;
  constructor(private messageService: MessageService,
              private updateService: DoUpdateService,
              private authService: AuthService
  ){
    this.setupSocketConnection();
  }

  ngOnInit(): void {

  }

  setupSocketConnection() {
    this.socket = io(SOCKET_ENDPOINT);
    // this.socket.on('message-broadcast', (data: string) => {
    //   if (data) {
    //     this.messageService.setMessage(data, true);
    //     this.updateService.doViewUpdate_AnzahlBenachrichtigungen(true);
    //   }
    // });
    this.socket.on('neueBenachrichtigung-broadcast', (data: number) => {
      if (data) {
        if(data == this.authService.getNutzer().id_buerger) {
          this.messageService.setMessage(data+"", true);
          this.updateService.doViewUpdate_AnzahlBenachrichtigungen(true);
          this.updateService.doViewUpdate_Anzeige_BonusBenachrichtigungen(true);
        }
      }
    });
    this.socket.on('neueDienstanfrageBenachrichtigung-broadcast', (data: number) => {
      if (data) {
        if(data == this.authService.getNutzer().id_buerger) {
          this.messageService.setMessage(data+"", true);
          this.updateService.doViewUpdate_AnzahlBenachrichtigungen(true);
          this.updateService.doViewUpdate_DienstanfrageBenachrichtigungen(true);
        }
      }
    });
  }


  SendNeueBeachrichtigung(tugendhafterId: number) {
    this.socket.emit('neueBenachrichtigung', tugendhafterId);
    this.messageService.setMessage('versendet', true);
  }

  SendNeueDienstanfrageBeachrichtigung(tugendhafterId: number) {
    this.socket.emit('neueDienstanfrageBenachrichtigung', tugendhafterId);
    this.messageService.setMessage('versendet', true);
  }


}
