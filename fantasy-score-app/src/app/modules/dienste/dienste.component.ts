import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { DienstService } from 'src/app/services/dienst.service';
import { Observable } from 'rxjs';
import { Dienst } from 'src/app/models/Dienst';
import { KategorieService } from 'src/app/services/kategorie.service';
import { FormBuilder } from '@angular/forms';
import { Kategorie } from 'src/app/models/Kategorie';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {DoUpdateService} from "../../services/do-update.service";
import { Buerger } from 'src/app/models/Buerger';

@Component({
  selector: 'app-dienste',
  templateUrl: './dienste.component.html',
  styleUrls: ['./dienste.component.css']
})
export class DiensteComponent implements OnInit {

  kategorieID = -1;
  searchInput: string;
  searchForm;
  searchText;
  nutzer: Buerger;

  willBuchen = false;

  constructor(private kategorieService: KategorieService,
    private dienstService: DienstService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private updateService: DoUpdateService) {
    this.searchForm = this.formBuilder.group({
      searchInput: ''
    });
  }

  kategorienListe: Observable<Kategorie[]>;
  dienste: Observable<Dienst[]>;
  shownDienste: Dienst[];
  searchIcon = faSearch;

  chosenDienst: Dienst;
  dienst: Observable<Dienst>;


  ngOnInit(): void {
    this.kategorienListe = this.kategorieService.getKategorien();

    this.kategorienListe.subscribe(data => {
      console.log(data);
      console.log(this.kategorienListe);
    });

    this.getNichtArchivierteDienste();
    this.updateService.currentDoUpdateState_Anzeige_DienstSuche.subscribe(message =>
      {this.getNichtArchivierteDienste();}
    );
  }

  get isLoggedIn() {
    const isLoggedIn = this.authService.isLoggedIn();
    if(isLoggedIn){ this.nutzer = this.authService.getNutzer(); }
    return isLoggedIn;
  }

  private getNichtArchivierteDienste(){
    this.dienste = this.dienstService.getNichtArchivierteDienste();
    this.dienste.subscribe(data => {
      this.shownDienste = data;
    });
  }

  isTyp(typ: string) : boolean {
    return this.authService.getNutzer().typ+"" == typ;
  }

  isDienstVon(name: string): boolean {
    return this.authService.getNutzer().benutzername == name;
  }

  onKategorieSelected(kategorieID):void {
    if(kategorieID == "-1") { // Alle anzeigen
      this.dienste = this.dienstService.getNichtArchivierteDienste();
      this.dienste.subscribe(data => {
        console.log(data);
        this.shownDienste = data;
      });
      return;
    }

    this.dienste = this.dienstService.getDiensteInKategorie(kategorieID)
    this.dienste.subscribe(data => {
      this.shownDienste = data;
    });
  }

  buchen(dienstID) {
    console.log("Nutzer will den Dienst " + dienstID+ "buchen");
    this.dienst = this.dienstService.getDienstByID(dienstID);
    this.dienst.subscribe(data => {
      this.chosenDienst = data;
      console.dir(this.chosenDienst);
      this.willBuchen = true;
    })
  }

  suchen(searchData) {
    console.log(searchData.searchInput);
    this.dienste = this.dienstService.getDiensteLike(searchData.searchInput);
    this.dienste.subscribe(data => {
      this.shownDienste = data;
      console.dir(this.shownDienste[0]);
    });
  }

}
