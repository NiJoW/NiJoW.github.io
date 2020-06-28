import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import {MessageService} from "../../../../../services/utility/message.service";
import {AuthService} from "../../../../../services/utility/auth.service";
import {FormBuilder} from "@angular/forms";
import {TugendService} from "../../../../../services/data/tugend.service";
import {Tugend} from "../../../../../models/Tugend";
import {KategorieService} from "../../../../../services/data/kategorie.service";
import {Observable} from "rxjs";
import {Kategorie} from "../../../../../models/Kategorie";

@Component({
  selector: 'app-bearbeite-tugend',
  templateUrl: './bearbeite-tugend.component.html',
  styleUrls: ['./bearbeite-tugend.component.css']
})
export class BearbeiteTugendComponent implements OnInit {

  bearbeiteTugendForm;
  tugend: Tugend;
  fehler = false;
  kategorien: Observable<Kategorie[]>;
  @Input() chosenTugend: Tugend;
  @Output() onCloseEvent = new EventEmitter();

  constructor(private messageService: MessageService,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private tugendService: TugendService,
              private kategorienService: KategorieService,) { }

  ngOnInit(): void {
    this.getKategorien();
    console.log(this.chosenTugend);
    this.tugend = this.chosenTugend[0];

    this.bearbeiteTugendForm = this.formBuilder.group({
      kategorie: this.tugend.kategorieID,
      titel: this.tugend.name,
      punkte:  this.tugend.wert,
      beschreibung: this.tugend.beschreibung,
      benoetigteWiederholungen: this.tugend.benoetigteWdh
    });
  }

  speichern(tugendData) {

   //Todo:Validierung der Daten

    //[name, beschreibung, wert, benoetigteWdh, kategorieID, id_tugend];
    this.tugend.name = tugendData.titel;
    this.tugend.beschreibung = tugendData.beschreibung;
    this.tugend.wert = tugendData.punkte;
    this.tugend.benoetigteWdh = tugendData.benoetigteWiederholungen;
    this.tugend.kategorieID = tugendData.kategorie;
    // bearbeitete Tugend in DB updaten
    this.tugendService.updateTugend(this.tugend).subscribe(data => {
      console.log(data);
    } );
    // Overlay schließen, Erfolgsmeldung anzeigen
    this.onCloseEvent.emit(null);
    this.messageService.setMessage("Die Tugend wurde erfolgreich bearbeitet.", true);
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
