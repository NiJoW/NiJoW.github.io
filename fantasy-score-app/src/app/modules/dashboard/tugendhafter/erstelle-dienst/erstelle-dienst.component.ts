import { AngeboteneDiensteComponent } from './../angebotene-dienste/angebotene-dienste.component';
import { Dienst } from './../../../../models/Dienst';
import { Kategorie } from './../../../../models/Kategorie';
import { KategorieService } from './../../../../services/kategorie.service';
import { MessageService } from 'src/app/services/message.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder } from '@angular/forms';
import { DienstService } from 'src/app/services/dienst.service';
import { Buerger } from './../../../../models/Buerger';
import { Observable } from 'rxjs';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-erstelle-dienst',
  templateUrl: './erstelle-dienst.component.html',
  styleUrls: ['./erstelle-dienst.component.css']
})
export class ErstelleDienstComponent implements OnInit {

  neuerDienstForm;
  kategorien: Observable<Kategorie[]>;
  nutzer: Buerger;
  @Output() onCloseEvent = new EventEmitter();

  constructor(private kategorienService: KategorieService,
              private dienstService: DienstService,
              private formBuilder: FormBuilder,
              private authService: AuthService,
              private messageService: MessageService,
              private angeboteneDiensteComponent: AngeboteneDiensteComponent) {
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
    const newDienst = new Dienst(diensteData.titel, diensteData.beschreibung, tugendhafterID, diensteData.kategorie);
    this.neuerDienstForm.reset();
    console.log('Your data has been submitted', newDienst);
    // neue Tugend in DB eintragen
    this.dienstService.addDienst(newDienst).subscribe(data => {
      console.log(data); } );
    // Overlay schließen, Erfolgsmeldung anzeigen
    this.onCloseEvent.emit(null);
    this.messageService.setMessage("Der Dienst wurde erfolgreich hinzugefügt.");
    this.angeboteneDiensteComponent.getAngeboteneDienste();
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
