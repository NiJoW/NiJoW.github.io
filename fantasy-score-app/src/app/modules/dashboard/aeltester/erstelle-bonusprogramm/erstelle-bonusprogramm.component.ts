import { ErstellteBonusprogrammeComponent } from './../erstellte-bonusprogramme/erstellte-bonusprogramme.component';
import { MessageService } from 'src/app/services/utility/message.service';
import { AuthService } from 'src/app/services/utility/auth.service';
import { FormBuilder } from '@angular/forms';
import { BonusService } from '../../../../services/data/bonus.service';
import { KategorieService } from '../../../../services/data/kategorie.service';
import { Buerger } from './../../../../models/Buerger';
import { Kategorie } from './../../../../models/Kategorie';
import { Observable } from 'rxjs';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Bonusprogramm } from 'src/app/models/Bonusprogramm';
import { DoUpdateService } from 'src/app/services/utility/do-update.service';

@Component({
  selector: 'app-erstelle-bonusprogramm',
  templateUrl: './erstelle-bonusprogramm.component.html',
  styleUrls: ['./erstelle-bonusprogramm.component.css']
})
export class ErstelleBonusprogrammComponent implements OnInit {

  neueBonusprogrammForm;
  kategorien: Observable<Kategorie[]>;
  nutzer: Buerger;
  fehler: string = " ";
  @Output() onCloseEvent = new EventEmitter();

  constructor(private kategorienService: KategorieService,
              private bonusprogrammService: BonusService,
              private formBuilder: FormBuilder,
              private authService: AuthService,
              private messageService: MessageService,
              private erstellteBonusprogrammeComponent: ErstellteBonusprogrammeComponent,
              private doUpdataService: DoUpdateService)
  {
    this.neueBonusprogrammForm = this.formBuilder.group({
      kategorie: 1,
      titel: '',
      punkte_in_kategorie: '',
      nachricht: ''

    });
  }


  ngOnInit(): void {
    this.getKategorien();
    this.nutzer = this.authService.getNutzer();

  }


  speichern(bonusprogrammData) {
    const aeltesterID  = this.nutzer.id_buerger;
    if(bonusprogrammData.titel != '' && bonusprogrammData.nachricht != '' && bonusprogrammData.punkte_in_kategorie != null && bonusprogrammData.punkte_in_kategorie != '') {
      const newBonusprogramm =  new Bonusprogramm(bonusprogrammData.titel, bonusprogrammData.nachricht, bonusprogrammData.punkte_in_kategorie,
        aeltesterID, bonusprogrammData.kategorie);
      this.neueBonusprogrammForm.reset();
      console.log('Your data has been submitted', newBonusprogramm);
      // neue Bonusprogramm in DB eintragen
      this.bonusprogrammService.addBonusprogramm(newBonusprogramm).subscribe(data => {
        console.log(data);
        // Overlay schließen, Erfolgsmeldung anzeigen
        this.onCloseEvent.emit(null);
        this.messageService.setMessage("Die Bonusprogramm wurde erfolgreich bearbeitet.", true);
        this.erstellteBonusprogrammeComponent.getErstellteBonusprogramme();
        this.doUpdataService.doViewUpdate_AnzahlErstellteBonis(true);
      } );

    }else {
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
