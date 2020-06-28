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

    this.socket.on('neueBonusBenachrichtigung-broadcast', (data: number) => {
      if (data) {
        if(data == this.authService.getNutzer().id_buerger) {
          this.messageService.setMessage("Bonus erhalten", true);
          this.updateService.doViewUpdate_AnzahlBenachrichtigungen(true);
          this.updateService.doViewUpdate_Anzeige_BonusBenachrichtigungen(true);
          this.updateService.doViewUpdate_AnzahlErhalteneBoni(true);
        }
      }
    });
    this.socket.on('neueDienstanfrageBenachrichtigung-broadcast', (data: number) => {
      if (data) {
        if(data == this.authService.getNutzer().id_buerger) {
          this.messageService.setMessage("Neue Dienstanfrage", true);
          this.updateService.doViewUpdate_AnzahlBenachrichtigungen(true);
          this.updateService.doViewUpdate_Anzeige_DienstanfrageBenachrichtigungen(true);
        }
      }
    });
    this.socket.on('antwortDienstanfrage-broadcast', (data: number) => {
      if (data) {
        if(data == this.authService.getNutzer().id_buerger) {
          this.messageService.setMessage("Antwort auf deine Dienstanfrage", true);
          this.updateService.doViewUpdate_AnzahlBenachrichtigungen(true);
          this.updateService.doViewUpdate_Anzeige_AntwortDienstanfrage(true);
        }
      }
    });
    this.socket.on('updateDienstSuche-broadcast', (data: boolean) => {
      if (data) {
          this.messageService.setMessage("Aktualisiert! Es gibt brandneuen Dienste!", true);
          this.updateService.doViewUpdate_Anzeige_DienstSuche(true);
      }
    });
  }


  SendNeueBeachrichtigung(tugendhafterId: number) {
    this.socket.emit('neueBonusBenachrichtigung', tugendhafterId);
  //  this.messageService.setMessage('versendet', true);
  }

  SendNeueDienstanfrageBeachrichtigung(tugendhafterId: number) {
    this.socket.emit('neueDienstanfrageBenachrichtigung', tugendhafterId);
  //  this.messageService.setMessage('versendet', true);
  }

  SendAntwortDienstanfrage(suchenderId: number) {
    this.socket.emit('antwortDienstanfrage', suchenderId);
    //  this.messageService.setMessage('versendet', true);
  }

  SendUpdateDienstSuche() { //tugendhafterId: number
    this.socket.emit('updateDienstSuche', true); //, tugendhafterId)
   // this.messageService.setMessage('versendet', true);
  }


}
