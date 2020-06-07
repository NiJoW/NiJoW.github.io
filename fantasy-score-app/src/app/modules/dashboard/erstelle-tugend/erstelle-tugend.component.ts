import {Component, OnInit, TemplateRef} from '@angular/core';
import {Observable} from 'rxjs';
import {Kategorie} from '../../../models/Kategorie';
import {KategorieService} from '../../../services/kategorie.service';
import { FormBuilder } from '@angular/forms';
import {Tugend} from '../../../models/Tugend';
import {TugendService} from '../../../services/tugend.service';

@Component({
  selector: 'app-erstelle-tugend',
  templateUrl: './erstelle-tugend.component.html',
  styleUrls: ['./erstelle-tugend.component.css']
})
export class ErstelleTugendComponent implements OnInit {

  kategorien: Observable<Kategorie[]>;
  neueTugendForm;
 /* selectedKategorie;
  levels:Array<Object> = [
    {num: 0, name: "AA"},
    {num: 1, name: "BB"}
  ];
  selectedLevel = this.levels[0]; */

  constructor(private kategorienService: KategorieService,
              private tugendService: TugendService,
              private formBuilder: FormBuilder) {
    this.neueTugendForm = this.formBuilder.group({
      kategorie: '',
      titel: '',
      punkte: '',
      beschreibung: '',
      benoetigteWiederholungen: ''

    });
  }


  ngOnInit(): void {
    this.kategorien = this.kategorienService.getKategorien();

    this.kategorien.subscribe(data => {
      console.log(data); this.setDefaultSelect(); } );
    console.log('Test, this.kategorien: ');
    console.log(this.kategorien);


  }

  setDefaultSelect(): void {
    console.log('setDefaultSelect');
  }

  onSubmit(tugendData) {
    // (TODO: Später: Validation)
    const aeltestenID  = 7; // (TODO: später ID des eingeloggten Ältesten nutzen)
    console.log(tugendData.kategorieID);
    const katID = 3; // parseInt(tugendData.kategorieID, 10);
    console.log("katID:");
    console.log(katID);

    const newTugend =  new Tugend(tugendData.titel, tugendData.beschreibung, tugendData.punkte, tugendData.benoetigteWiederholungen,
      aeltestenID, katID);
    this.neueTugendForm.reset();
    console.log("newTugend.kategorieID:");
    console.log(newTugend.kategorieID);

    console.log('Your data has been submitted', tugendData);

    this.tugendService
      .addTugend(newTugend).subscribe(data => {
      console.log(data); } );
  }


}
