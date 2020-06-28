import { AuthService } from '../../services/utility/auth.service';
import { Bonusprogramm } from './../../models/Bonusprogramm';
import { Component, OnInit } from '@angular/core';
import { BonusService } from 'src/app/services/data/bonus.service';
import { KategorieService } from 'src/app/services/data/kategorie.service';
import { Kategorie } from 'src/app/models/Kategorie';
import { Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Buerger } from 'src/app/models/Buerger';

@Component({
  selector: 'app-bonusprogramme',
  templateUrl: './bonusprogramme.component.html',
  styleUrls: ['./bonusprogramme.component.css']
})
export class BonusprogrammeComponent implements OnInit {

  kategorieID = -1;
  searchForm;
  nutzer: Buerger;
 

  constructor(private kategorieService: KategorieService, 
    private bonusService: BonusService,
    private formBuilder: FormBuilder,
    private authService: AuthService) {
      this.searchForm = this.formBuilder.group({
        searchInput: ''
      });
    }

    kategorienListe: Observable<Kategorie[]>;
    bonusprogramme: Observable<Bonusprogramm[]>;
    shownProgramme: Bonusprogramm[];
    searchIcon = faSearch;

  ngOnInit(): void {
    this.kategorienListe = this.kategorieService.getKategorien();

    this.kategorienListe.subscribe(data => {
      console.log(data);
      console.log(this.kategorienListe);
    });

    this.bonusprogramme = this.bonusService.getNichtArchivierteBonusprogramme();
      this.bonusprogramme.subscribe(data => {
        this.shownProgramme = data;
      });
  }

  get isLoggedIn() {
    const isLoggedIn = this.authService.isLoggedIn();
    if(isLoggedIn){ this.nutzer = this.authService.getNutzer(); }
    return isLoggedIn;
  }

  onKategorieSelected(kategorieID):void {
    if(kategorieID == "-1") { // Alle anzeigen
      this.bonusprogramme = this.bonusService.getNichtArchivierteBonusprogramme();
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
    if(searchData.searchInput === "") {
      this.bonusprogramme = this.bonusService.getNichtArchivierteBonusprogramme();
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
