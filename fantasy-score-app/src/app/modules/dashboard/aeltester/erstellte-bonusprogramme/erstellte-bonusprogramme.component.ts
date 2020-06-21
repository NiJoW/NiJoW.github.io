import { Bonusprogramm } from './../../../../models/Bonusprogramm';
import { faPencilAlt, faPlus, faAngleDown, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { Bonuseintrag } from '../../../../models/Bonuseintrag';
import { BonusService } from '../../../../services/bonus.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-erstellte-bonusprogramme',
  templateUrl: './erstellte-bonusprogramme.component.html',
  styleUrls: ['./erstellte-bonusprogramme.component.css']
})
export class ErstellteBonusprogrammeComponent implements OnInit {

  eigeneErstellteBonusprogramme: Observable<Bonusprogramm[]>;
  editIcon = faPencilAlt;
  createIcon = faPlus;
  moreIcon = faAngleDown;
  deleteIcon = faTrash;

  zeigeBearbeitenOverlay = false;
  zeigeErstellenOverlay = false;
  chosenBonusprogramm: Bonusprogramm;
  bonusprogrammObservable : Observable<Bonusprogramm>;
  id: number;

  constructor(private bonusService: BonusService) { }

  erstellteBonusprogramme: Observable<Bonuseintrag[]>;

  ngOnInit(): void {
    this.getEigeneErstellteBonusprogramme();
    this.getErstelteBonusprogramme();
  }

  getErstelteBonusprogramme() {
    this.erstellteBonusprogramme = this.bonusService.getErstellteBonusprogramme();

    this.erstellteBonusprogramme.subscribe(data => {
      console.log(data);});
      console.log(this.erstellteBonusprogramme);
  }

  bearbeiten(bonusprogrammID) {
    console.log("Nutzer will das Bonusprog. " + bonusprogrammID)+ " bearbeiten";
    this.bonusprogrammObservable = this.bonusService.getBonusprogrammByID(bonusprogrammID);
    this.bonusprogrammObservable.subscribe(data => {
      this.chosenBonusprogramm = data;
      console.dir(this.chosenBonusprogramm);
      this.zeigeBearbeitenOverlay = true;
    });
  }

  neuesBonusprgrammErstellen(){
    this.zeigeErstellenOverlay = true;
  }

  private getEigeneErstellteBonusprogramme() {
    this.eigeneErstellteBonusprogramme = this.bonusService.getSelbstErstellteBonusprogramme();

    this.eigeneErstellteBonusprogramme.subscribe(data => {
      console.log('Bonusprogramm aus DB in Componente:');
      console.log(data);
    });
  }

  updateBonusprogrammeOnEvent(){
    this.zeigeBearbeitenOverlay = false;
    this.zeigeErstellenOverlay = false;
    this.getEigeneErstellteBonusprogramme();
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
