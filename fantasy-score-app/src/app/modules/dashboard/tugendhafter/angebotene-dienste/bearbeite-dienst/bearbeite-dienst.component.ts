import { AngeboteneDiensteComponent } from './../angebotene-dienste.component';
import { DienstService } from '../../../../../services/data/dienst.service';
import { KategorieService } from '../../../../../services/data/kategorie.service';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/utility/auth.service';
import { MessageService } from 'src/app/services/utility/message.service';
import { Observable } from 'rxjs';
import { Dienst } from '../../../../../models/Dienst';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Kategorie } from 'src/app/models/Kategorie';

@Component({
  selector: 'app-bearbeite-dienst',
  templateUrl: './bearbeite-dienst.component.html',
  styleUrls: ['./bearbeite-dienst.component.css']
})
export class BearbeiteDienstComponent implements OnInit {

  bearbeiteDienstForm;
  dienst: Dienst;
  fehler = false;
  kategorien: Observable<Kategorie[]>;
  @Input() chosenDienst: Dienst;
  @Output() onCloseEvent = new EventEmitter();

  constructor(private messageService: MessageService,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private dienstService: DienstService,
              private kategorienService: KategorieService,
              private angeboteneDiensteComponent: AngeboteneDiensteComponent) { }

  ngOnInit(): void {
    this.getKategorien();
    console.log(this.chosenDienst);
    this.dienst = this.chosenDienst[0];

    this.bearbeiteDienstForm = this.formBuilder.group({
      kategorie: this.dienst.kategorieID,
      titel: this.dienst.name,
      beschreibung: this.dienst.beschreibung
    });
  }

  speichern(dienstData) {

   //Todo:Validierung der Daten

    this.dienst.name = dienstData.titel;
    this.dienst.beschreibung = dienstData.beschreibung;
    this.dienst.kategorieID = dienstData.kategorie;
    // bearbeitete Tugend in DB updaten
    this.dienstService.updateDienst(this.dienst).subscribe(data => {
      console.log(data);
    } );
    // Overlay schließen, Erfolgsmeldung anzeigen
    this.onCloseEvent.emit(null);
    this.messageService.setMessage("Die Tugend wurde erfolgreich bearbeitet.", true);
    this.angeboteneDiensteComponent.getAngeboteneDienste();
  }

  cancel() {
    this.onCloseEvent.emit(null);
  }

  private getKategorien() {
    this.kategorien = this.kategorienService.getKategorien();
    this.kategorien.subscribe(data => {
      console.log(data);
    });
  }

}
