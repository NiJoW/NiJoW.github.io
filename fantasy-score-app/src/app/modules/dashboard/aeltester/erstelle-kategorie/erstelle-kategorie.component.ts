import { MessageService } from './../../../../services/message.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder } from '@angular/forms';
import { KategorieService } from './../../../../services/kategorie.service';
import { Buerger } from './../../../../models/Buerger';
import { Observable } from 'rxjs';
import { Kategorie } from 'src/app/models/Kategorie';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-erstelle-kategorie',
  templateUrl: './erstelle-kategorie.component.html',
  styleUrls: ['./erstelle-kategorie.component.css']
})
export class ErstelleKategorieComponent implements OnInit {

  neueKategorieForm;
  kategorien: Observable<Kategorie[]>;
  nutzer: Buerger;
  @Output() onCloseEvent = new EventEmitter();

  constructor(private kategorieService: KategorieService,
              private formBuilder: FormBuilder,
              private authService: AuthService,
              private messageService: MessageService)
  {
    this.neueKategorieForm = this.formBuilder.group({
      bezeichnung: ''
    });
  }


  ngOnInit(): void {
    this.getKategorien();
    this.nutzer = this.authService.getNutzer();

  }


  speichern(kategorieData) {
    //Todo:Validierung der Daten

    const aeltestenID  = this.nutzer.id_buerger;
    const newKategorie =  new Kategorie(kategorieData.bezeichnung, aeltestenID);
    this.neueKategorieForm.reset();
    console.log('Your data has been submitted', newKategorie);
    // neue Kategorie in DB eintragen
    this.kategorieService.addKategorie(newKategorie).subscribe(data => {
      console.log(data); } );
    // Overlay schließen, Erfolgsmeldung anzeigen
    this.onCloseEvent.emit(null);
    this.messageService.setMessage("Die Kategorie wurde erfolgreich erstellt.", true);
  }

  private getKategorien() {
    this.kategorien = this.kategorieService.getKategorien();

    this.kategorien.subscribe(data => {
      console.log(data);
    });
  }

  cancel() {
    this.onCloseEvent.emit(null);
  }


}
