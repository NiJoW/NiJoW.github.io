import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs';
import {Kategorie} from '../../../../models/Kategorie';
import {KategorieService} from '../../../../services/kategorie.service';
import { FormBuilder } from '@angular/forms';
import {Tugend} from '../../../../models/Tugend';
import {TugendService} from '../../../../services/tugend.service';
import {AuthService} from "../../../../services/auth.service";
import {Buerger} from "../../../../models/Buerger";
import {MessageService} from "../../../../services/message.service";

@Component({
  selector: 'app-erstelle-tugend',
  templateUrl: './erstelle-tugend.component.html',
  styleUrls: ['./erstelle-tugend.component.css']
})
export class ErstelleTugendComponent implements OnInit {

  neueTugendForm;
  kategorien: Observable<Kategorie[]>;
  nutzer: Buerger;
  @Output() onCloseEvent = new EventEmitter();

  constructor(private kategorienService: KategorieService,
              private tugendService: TugendService,
              private formBuilder: FormBuilder,
              private authService: AuthService,
              private messageService: MessageService)
  {
    this.neueTugendForm = this.formBuilder.group({
      kategorie: 1,
      titel: '',
      punkte: '',
      beschreibung: '',
      benoetigteWiederholungen: ''

    });
  }


  ngOnInit(): void {
    this.getKategorien();
    this.nutzer = this.authService.getNutzer();

  }


  speichern(tugendData) {
    //Todo:Validierung der Daten

    const aeltestenID  = this.nutzer.id_buerger;
    const newTugend =  new Tugend(tugendData.titel, tugendData.beschreibung, tugendData.punkte, tugendData.benoetigteWiederholungen,
      aeltestenID, tugendData.kategorie);
    this.neueTugendForm.reset();
    console.log('Your data has been submitted', newTugend);
    // neue Tugend in DB eintragen
    this.tugendService.addTugend(newTugend).subscribe(data => {
      console.log(data); } );
    // Overlay schließen, Erfolgsmeldung anzeigen
    this.onCloseEvent.emit(null);
    this.messageService.setMessage("Die Tugend wurde erfolgreich bearbeitet.", true);
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
