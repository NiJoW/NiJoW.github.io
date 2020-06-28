import { AngeboteneDiensteComponent } from './../angebotene-dienste/angebotene-dienste.component';
import { Dienst } from './../../../../models/Dienst';
import { Kategorie } from './../../../../models/Kategorie';
import { KategorieService } from '../../../../services/data/kategorie.service';
import { MessageService } from 'src/app/services/utility/message.service';
import { AuthService } from 'src/app/services/utility/auth.service';
import { FormBuilder } from '@angular/forms';
import { DienstService } from 'src/app/services/data/dienst.service';
import { Buerger } from './../../../../models/Buerger';
import { Observable } from 'rxjs';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {DoUpdateService} from "../../../../services/utility/do-update.service";
import {WebsocketService} from "../../../../services/utility/websocket.service";

@Component({
  selector: 'app-erstelle-dienst',
  templateUrl: './erstelle-dienst.component.html',
  styleUrls: ['./erstelle-dienst.component.css']
})
export class ErstelleDienstComponent implements OnInit {

  neuerDienstForm;
  kategorien: Observable<Kategorie[]>;
  nutzer: Buerger;
  fehler = " ";
  @Output() onCloseEvent = new EventEmitter();

  constructor(private kategorienService: KategorieService,
              private dienstService: DienstService,
              private formBuilder: FormBuilder,
              private authService: AuthService,
              private messageService: MessageService,
              private angeboteneDiensteComponent: AngeboteneDiensteComponent,
              private updateService: DoUpdateService,
              private websocketService: WebsocketService) {
                this.neuerDienstForm = this.formBuilder.group({
                  kategorie: 1,
                  titel: '',
                  beschreibung: ''
                });
              }

  ngOnInit(): void {
    this.getKategorien();
    this.nutzer = this.authService.getNutzer();
  }

  speichern(diensteData) {
    const tugendhafterID = this.nutzer.id_buerger;
    if(diensteData.titel != '' && diensteData.beschreibung !='') {
      this.fehler = " ";
      const newDienst = new Dienst(diensteData.titel, diensteData.beschreibung, tugendhafterID, diensteData.kategorie);
      this.neuerDienstForm.reset();

      // neue Tugend in DB eintragen
      this.dienstService.addDienst(newDienst).subscribe(data => {
        // Overlay schließen, Erfolgsmeldung anzeigen, Views updaten
        this.onCloseEvent.emit(null);
        this.messageService.setMessage("Der Dienst wurde erfolgreich erstellt.", true);
        this.angeboteneDiensteComponent.getAngeboteneDienste();
        this.updateService.doViewUpdate_Anzeige_DienstSuche(true);
        this.websocketService.SendUpdateDienstSuche();
      } );

    } else {
      this.fehler = "Bitte alle Felder ausfüllen!";
    }
  }

  private getKategorien() {
    this.kategorien = this.kategorienService.getKategorien();

    this.kategorien.subscribe(data => {
      console.log(data);
    });
  }

  cancel() {
    this.onCloseEvent.emit(null);
  }

}
