import { ErstellteBonusprogrammeComponent } from './../erstellte-bonusprogramme.component';
import { KategorieService } from './../../../../../services/kategorie.service';
import { BonusService } from './../../../../../services/bonus.service';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { Observable } from 'rxjs';
import { Bonusprogramm } from './../../../../../models/Bonusprogramm';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Kategorie } from 'src/app/models/Kategorie';

@Component({
  selector: 'app-bearbeite-bonusprogramm',
  templateUrl: './bearbeite-bonusprogramm.component.html',
  styleUrls: ['./bearbeite-bonusprogramm.component.css']
})
export class BearbeiteBonusprogrammComponent implements OnInit {

  bearbeiteBonusprogrammForm;
  bonusprogramm: Bonusprogramm;
  fehler = false;
  kategorien: Observable<Kategorie[]>;
  @Input() chosenBonusprogramm: Bonusprogramm;
  @Output() onCloseEvent = new EventEmitter();

  constructor(private messageService: MessageService,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private bonusprogrammService: BonusService,
              private kategorienService: KategorieService,
              private erstellteBonusprogrammeComponent: ErstellteBonusprogrammeComponent) { }

  ngOnInit(): void {
    this.getKategorien();
    console.log(this.chosenBonusprogramm);
    this.bonusprogramm = this.chosenBonusprogramm[0];

    this.bearbeiteBonusprogrammForm = this.formBuilder.group({
      kategorie: this.bonusprogramm.kategorieID,
      titel: this.bonusprogramm.titel,
      punkte_in_kategorie: this.bonusprogramm.punkte_in_kategorie,
      nachricht: this.bonusprogramm.nachricht
    });
  }

  speichern(bonusprogrammData) {

   //Todo:Validierung der Daten
    this.bonusprogramm.titel = bonusprogrammData.titel;
    this.bonusprogramm.punkte_in_kategorie = bonusprogrammData.punkte_in_kategorie;
    this.bonusprogramm.nachricht = bonusprogrammData.nachricht;
    this.bonusprogramm.kategorieID = bonusprogrammData.kategorie;
    // bearbeitete Bonusprogramm in DB updaten
    this.bonusprogrammService.updateBonusprogramm(this.bonusprogramm).subscribe(data => {
      console.log(data);
    } );
    // Overlay schließen, Erfolgsmeldung anzeigen
    this.onCloseEvent.emit(null);
    this.messageService.setMessage("Die Bonusprogramm wurde erfolgreich bearbeitet.");
    this.erstellteBonusprogrammeComponent.getErstellteBonusprogramme();
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
