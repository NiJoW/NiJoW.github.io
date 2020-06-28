import { KategorieService } from 'src/app/services/data/kategorie.service';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/utility/auth.service';
import { MessageService } from 'src/app/services/utility/message.service';
import { Observable } from 'rxjs';
import { Kategorie } from './../../../../../models/Kategorie';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bearbeite-kategorie',
  templateUrl: './bearbeite-kategorie.component.html',
  styleUrls: ['./bearbeite-kategorie.component.css']
})
export class BearbeiteKategorieComponent implements OnInit {

  bearbeiteKategorieForm;
  kategorie: Kategorie;
  fehler = false;
  kategorien: Observable<Kategorie[]>;
  @Input() chosenKategorie: Kategorie;
  @Output() onCloseEvent = new EventEmitter();

  constructor(private messageService: MessageService,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private kategorieService: KategorieService) { }

  ngOnInit(): void {
    //this.getKategorien();
    console.log(this.chosenKategorie);
    this.kategorie = this.chosenKategorie[0];

    this.bearbeiteKategorieForm = this.formBuilder.group({
      bezeichnung: this.kategorie.bezeichnung
    });
  }

  speichern(kategorieData) {

   //Todo:Validierung der Daten

    //[name, beschreibung, wert, benoetigteWdh, kategorieID, id_kategorie];
    this.kategorie.bezeichnung = kategorieData.bezeichnung;
    // bearbeitete Kategorie in DB updaten
    this.kategorieService.updateKategorie(this.kategorie).subscribe(data => {
      console.log(data);
    } );
    // Overlay schließen, Erfolgsmeldung anzeigen
    this.onCloseEvent.emit(null);
    this.messageService.setMessage("Die Kategorie wurde erfolgreich bearbeitet.", true);
  }

  cancel() {
    this.onCloseEvent.emit(null);
  }

  private getKategorien() {
    this.kategorien = this.kategorieService.getKategorien();
    this.kategorien.subscribe(data => {
      console.log(data);
    });
  }

}