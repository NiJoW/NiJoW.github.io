import {Component, OnInit, TemplateRef} from '@angular/core';
import {Observable} from 'rxjs';
import {Kategorie} from '../../../../models/Kategorie';
import {KategorieService} from '../../../../services/kategorie.service';
import { FormBuilder } from '@angular/forms';
import {Tugend} from '../../../../models/Tugend';
import {TugendService} from '../../../../services/tugend.service';
import {AuthService} from "../../../../services/auth.service";
import {Buerger} from "../../../../models/Buerger";

@Component({
  selector: 'app-erstelle-tugend',
  templateUrl: './erstelle-tugend.component.html',
  styleUrls: ['./erstelle-tugend.component.css']
})
export class ErstelleTugendComponent implements OnInit {

  kategorien: Observable<Kategorie[]>;
  neueTugendForm;
  nutzer: Buerger;

  constructor(private kategorienService: KategorieService,
              private tugendService: TugendService,
              private formBuilder: FormBuilder,
              private authService: AuthService) {
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


  onSubmit(tugendData) {
    // (TODO: Später: Validation)
    const aeltestenID  = this.nutzer.id_buerger;
    const newTugend =  new Tugend(tugendData.titel, tugendData.beschreibung, tugendData.punkte, tugendData.benoetigteWiederholungen,
      aeltestenID, tugendData.kategorie);
    this.neueTugendForm.reset();

    console.log('Your data has been submitted', newTugend);

    this.tugendService.addTugend(newTugend).subscribe(data => {
      console.log(data); } );
  }

  private getKategorien() {
    this.kategorien = this.kategorienService.getKategorien();

    this.kategorien.subscribe(data => {
      console.log(data);
    });
  }


}
