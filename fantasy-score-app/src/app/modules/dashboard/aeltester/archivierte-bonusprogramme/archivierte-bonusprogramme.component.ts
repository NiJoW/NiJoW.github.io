import { BonusService } from '../../../../services/data/bonus.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Bonusprogramm } from 'src/app/models/Bonusprogramm';
import { faPencilAlt, faPlus, faAngleDown, faTrashRestore } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-archivierte-bonusprogramme',
  templateUrl: './archivierte-bonusprogramme.component.html',
  styleUrls: ['./archivierte-bonusprogramme.component.css']
})
export class ArchivierteBonusprogrammeComponent implements OnInit {

erstellteBonusprogramme: Observable<Bonusprogramm[]>;
  editIcon = faPencilAlt;
  createIcon = faPlus;
  moreIcon = faAngleDown;
  id: number;
  isEmpty = false;
  restoreIcon = faTrashRestore;


  zeigeBearbeitenOverlay = false;
  zeigeErstellenOverlay = false;
  chosenBonusprogramm: Bonusprogramm;
  bonusprogrammObservable : Observable<Bonusprogramm>;

  willBonusprogrammWiederherstellen = false;
  message: number;

  constructor(private bonusprogrammService: BonusService) { }

  ngOnInit(): void {
    this.getArchivierteBonusprogramme();
  }

  wiederherstellen(bonusprogrammID) {
    this.willBonusprogrammWiederherstellen = true;
    this.message = bonusprogrammID;
  }

  recieveDone($event) {
    this.updateBonusprogrammeOnEvent();
  }

  neueBonusprogrammErstellen(){
    this.zeigeErstellenOverlay = true;
  }

  private getArchivierteBonusprogramme() {
    this.erstellteBonusprogramme = this.bonusprogrammService.getArchivierteBonusprogramme();

    this.erstellteBonusprogramme.subscribe(data => {
      console.log('Bonusprogramm aus DB in Componente:');
      console.log(data);
    });
  }

  updateBonusprogrammeOnEvent(){
    this.zeigeBearbeitenOverlay = false;
    this.zeigeErstellenOverlay = false;
    this.getArchivierteBonusprogramme();
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
