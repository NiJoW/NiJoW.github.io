import { faAngleDown, faTrash, faPlus, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { Kategorie } from './../../../../models/Kategorie';
import { KategorieService } from '../../../../services/data/kategorie.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-erstellte-kategorien',
  templateUrl: './erstellte-kategorien.component.html',
  styleUrls: ['./erstellte-kategorien.component.css']
})
export class ErstellteKategorienComponent implements OnInit {

  erstellteKategorien: Observable<Kategorie[]>;
  editIcon = faPencilAlt;
  createIcon = faPlus;
  deleteIcon = faTrash;
  moreIcon = faAngleDown;
  id: number;
  isEmpty = false;


  zeigeBearbeitenOverlay = false;
  zeigeErstellenOverlay = false;
  chosenKategorie: Kategorie;
  kategorieObservable : Observable<Kategorie>;


  constructor(private kategorieService: KategorieService) { }

  ngOnInit(): void {
    this.getErstellteKategorien();
  }

  bearbeiten(kategorieID) {
    console.log("Nutzer will die Kategorie " + kategorieID+ " bearbeiten");
    this.kategorieObservable = this.kategorieService.getKategorieByID(kategorieID);
    this.kategorieObservable.subscribe(data => {
      if(data == null) {
        this.isEmpty = true;
        return;
      }
      this.chosenKategorie = data;
      console.dir(this.chosenKategorie);
      this.zeigeBearbeitenOverlay = true;
    });
  }

  neueKategorieErstellen(){
    this.zeigeErstellenOverlay = true;
  }

  private getErstellteKategorien() {
    this.erstellteKategorien = this.kategorieService.getErstellteKategorien();

    this.erstellteKategorien.subscribe(data => {
      console.log('Kategorie aus DB in Componente:');
      console.log(data);
    });
  }

  updateKategorienOnEvent(){
    this.zeigeBearbeitenOverlay = false;
    this.zeigeErstellenOverlay = false;
    this.getErstellteKategorien();
  }

  changeFormat(id) {
    console.log(id);
    if(id == this.id) {
      this.id = -1;
    } else {
      this.id = id;
    }
  }

}