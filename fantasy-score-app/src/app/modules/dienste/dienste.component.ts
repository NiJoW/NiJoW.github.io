import { Component, OnInit } from '@angular/core';
import { DienstService } from 'src/app/services/dienst.service';
import { Observable } from 'rxjs';
import { Dienst } from 'src/app/models/Dienst';

@Component({
  selector: 'app-dienste',
  templateUrl: './dienste.component.html',
  styleUrls: ['./dienste.component.css']
})
export class DiensteComponent implements OnInit {

  kategorieID: number;
  searchInput: string;

  constructor(private dienstService: DienstService) { }

  dienste: Observable<Dienst[]>;
  shownDienste: Dienst[];

  ngOnInit(): void {
    
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
    console.log("Nutzer will den DIenst " + dienstID)+ "buchen";
  }

}
