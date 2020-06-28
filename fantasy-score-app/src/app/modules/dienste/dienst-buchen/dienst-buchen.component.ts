
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { formatDate } from '@angular/common';
import { Dienst } from 'src/app/models/Dienst';
import { FormBuilder } from '@angular/forms';
import { DienstService} from 'src/app/services/data/dienst.service';
import { AuthService } from 'src/app/services/utility/auth.service';
import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { MessageService } from 'src/app/services/utility/message.service';
import {WebsocketService} from "../../../services/utility/websocket.service";

@Component({
  selector: 'app-dienst-buchen',
  templateUrl: './dienst-buchen.component.html',
  styleUrls: ['./dienst-buchen.component.css']
})
export class DienstBuchenComponent implements OnInit {

  dienstForm;
  dienst: Dienst;
  fehler = false;
  newDienst: Observable<Dienst>;

  today = new Date();
  dd = String(this.today.getDate()).padStart(2, '0');
  mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
  yyyy = this.today.getFullYear();

  currentDate = this.yyyy + '-' + this.mm + '-' + this.dd;

  constructor(private dienstService: DienstService,
    private messageService: MessageService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private websocketService : WebsocketService) {
    this.dienstForm = this.formBuilder.group({
      datum: ''
    });
  }

  @Input() chosenDienst: Dienst;

  @Output() onClose = new EventEmitter();

  ngOnInit(): void {
    console.log(this.chosenDienst);
    this.dienst = this.chosenDienst[0];
  }

  buchen(dienstBuchenData) {
    console.log("neu" + dienstBuchenData.datum);
    console.log("current" + this.currentDate);
    if(dienstBuchenData.datum === null || dienstBuchenData.datum === '' || dienstBuchenData.datum <= this.currentDate) { //TODO funktioniert nicht + nur dates nach heute akzeptieren
      this.fehler = true;
      console.log("show Fehler");
    } else {
      this.newDienst = this.dienstService.createDiensvertrag(this.chosenDienst[0].id_dienstangebot, this.dienstForm.value.datum);

      this.newDienst.subscribe(data => {
        console.dir(data);
        this.onClose.emit(null);
        this.messageService.setMessage("Die Dienst-Anfrage wurde deinem Dashboard hinzugefügt.", true);
        this.websocketService.SendNeueDienstanfrageBeachrichtigung(this.dienst.tugendhafterID);
      });

    }
  }

  cancel() {
    console.log("close Modal");
    this.onClose.emit(null);
  }

}
