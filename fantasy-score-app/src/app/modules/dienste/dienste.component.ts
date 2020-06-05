import { Component, OnInit } from '@angular/core';
import { DienstService } from 'src/app/services/dienst.service';
import { Observable } from 'rxjs';
import { Dienst } from 'src/app/models/Dienst';
import { KategorieService } from 'src/app/services/kategorie.service';
import { FormBuilder } from '@angular/forms';
import { Kategorie } from 'src/app/models/Kategorie';

@Component({
  selector: 'app-dienste',
  templateUrl: './dienste.component.html',
  styleUrls: ['./dienste.component.css']
})
export class DiensteComponent implements OnInit {

  kategorieID: number;
  searchInput: string;
  searchForm;
  searchText;
  
  willBuchen = false;

  constructor(private kategorieService: KategorieService, 
    private dienstService: DienstService,
    private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      searchInput: ''
    });
  }

  kategorienListe: Observable<Kategorie[]>;
  dienste: Observable<Dienst[]>;
  shownDienste: Dienst[];


  choosenDienst: Dienst;
  dienst: Observable<Dienst>;


  ngOnInit(): void {
    this.kategorienListe = this.kategorieService.getKategorien();

    this.kategorienListe.subscribe(data => {
      console.log(data);
      console.log(this.kategorienListe);
    });

    this.dienste = this.dienstService.getDienste();
    this.dienste.subscribe(data => {
      console.log(data);
      this.shownDienste = data;
    });
  }

  onKategorieSelected(kategorieID):void {
    if(kategorieID == "-1") { // Alle anzeigen
      this.dienste = this.dienstService.getDienste();
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
    console.log("Nutzer will den Dienst " + dienstID)+ "buchen";
    this.dienst = this.dienstService.getDienstByID(dienstID);
    this.dienst.subscribe(data => {
      this.choosenDienst = data;
      console.dir(this.choosenDienst);
      this.willBuchen = true;
    })
  }

}
