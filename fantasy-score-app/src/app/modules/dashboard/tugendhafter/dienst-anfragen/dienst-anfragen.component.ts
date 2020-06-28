import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Observable } from 'rxjs';
import { Dienst } from 'src/app/models/Dienst';
import { DienstService } from 'src/app/services/dienst.service';
import {DoUpdateService} from "../../../../services/do-update.service";
import {WebsocketService} from "../../../../services/websocket.service";

@Component({
  selector: 'app-dienst-anfragen',
  templateUrl: './dienst-anfragen.component.html',
  styleUrls: ['./dienst-anfragen.component.css']
})
export class DienstAnfragenComponent implements OnInit {

  @Input() angefragteDienste: Observable<Dienst[]>;
  @Output() onCloseEvent = new EventEmitter();

  dienstObservable: Observable<Dienst>;

  constructor(private dienstService: DienstService,
              private updateService: DoUpdateService,
              private websocketService: WebsocketService) { }

  ngOnInit(): void {

  }

  antragAnnehmen(dienstID:number, suchenderID: number) {
    console.log("Dienst: " + dienstID + " annehmen!");
    this.dienstObservable = this.dienstService.bestaetigeVertrag(dienstID, 'bestätigt');
    this.dienstObservable.subscribe(data => {
      console.dir(data);
      this.updateService.doViewUpdate_AnzahlBenachrichtigungen(true);
      this.websocketService.SendAntwortDienstanfrage(suchenderID);
      this.onCloseEvent.emit(null);
    })
  }

  antragAblehnen(dienstID:number, suchenderID: number) {
    console.log("Dienst: " + dienstID + " ablehnen!");
    this.dienstObservable = this.dienstService.bestaetigeVertrag(dienstID, 'abgelehnt');
    this.dienstObservable.subscribe(data => {
      console.dir(data);
      this.updateService.doViewUpdate_AnzahlBenachrichtigungen(true);
      this.websocketService.SendAntwortDienstanfrage(suchenderID);
      this.onCloseEvent.emit(null);
    })
  }
}
