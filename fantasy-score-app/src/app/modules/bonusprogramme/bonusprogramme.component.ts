import { Bonusprogramm } from './../../models/Bonusprogramm';
import { Component, OnInit } from '@angular/core';
import { BonusService } from 'src/app/services/bonus.service';
import { KategorieService } from 'src/app/services/kategorie.service';
import { Kategorie } from 'src/app/models/Kategorie';
import { Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-bonusprogramme',
  templateUrl: './bonusprogramme.component.html',
  styleUrls: ['./bonusprogramme.component.css']
})
export class BonusprogrammeComponent implements OnInit {

  kategorienListe: Observable<Kategorie[]>;
  searchForm;
  bonusprogramme: Observable<Bonusprogramm[]>;
  shownProgramme: Bonusprogramm[];
  kategorieID: number;

  constructor(private kategorieService: KategorieService, 
    private bonusService: BonusService,
    private formBuilder: FormBuilder) {
      this.searchForm = this.formBuilder.group({
        searchInput: ''
      });
    }

  ngOnInit(): void {
    this.kategorienListe = this.kategorieService.getKategorien();

    this.kategorienListe.subscribe(data => {
      console.log(data);
      console.log(this.kategorienListe);
    });

    this.bonusprogramme = this.bonusService.getBonusprogramme();
      this.bonusprogramme.subscribe(data => {
        console.log(data);
        this.shownProgramme = data;
      });
  }

  onKategorieSelected(kategorieID):void {
    if(kategorieID == "-1") { // Alle anzeigen
      this.bonusprogramme = this.bonusService.getBonusprogramme();
      this.bonusprogramme.subscribe(data => {
        console.log(data);
        this.shownProgramme = data;
      });
      return;
    }

    this.bonusprogramme = this.bonusService.getBonusprogrammeVonKategorie(kategorieID)
    this.bonusprogramme.subscribe(data => {
      this.shownProgramme = data;
      console.log(this.shownProgramme[0].titel);
    });
  }

  suchen(searchData) {
    console.log(searchData.searchInput);
    if(searchData.searchInput = "") {
      this.bonusprogramme = this.bonusService.getBonusprogramme();
      this.bonusprogramme.subscribe(data => {
        console.log(data);
        this.shownProgramme = data;
      });
    } else {
      this.bonusprogramme = this.bonusService.getBonusprogrammeLike(searchData.searchInput);
      this.bonusprogramme.subscribe(data => {
        this.shownProgramme = data;
        console.dir(this.shownProgramme[0]);
      });
    }
  }

}
