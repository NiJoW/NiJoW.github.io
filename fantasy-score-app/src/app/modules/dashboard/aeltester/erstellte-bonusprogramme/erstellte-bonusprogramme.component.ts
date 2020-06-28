import { Bonusprogramm } from './../../../../models/Bonusprogramm';
import { faPencilAlt, faPlus, faAngleDown, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { BonusService } from '../../../../services/data/bonus.service';
import { Component, OnInit } from '@angular/core';
import {Buerger} from "../../../../models/Buerger";
import {MessageService} from "../../../../services/utility/message.service";
import {WebsocketService} from "../../../../services/utility/websocket.service";

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
  isEmpty = false;

  willBonusprogrammLoeschen = false;
  message: number;

  constructor(private bonusService: BonusService,
              private messageService: MessageService,
              private websocketService: WebsocketService) { }

  erstellteBonusprogramme: Observable<Bonusprogramm[]>;

  ngOnInit(): void {
    this.getEigeneErstellteBonusprogramme();
    this.getErstellteBonusprogramme();
  }

  getErstellteBonusprogramme() {
    this.erstellteBonusprogramme = this.bonusService.getSelbstErstellteBonusprogramme();

    this.erstellteBonusprogramme.subscribe(data => {
      console.log(data);});
      console.log(this.erstellteBonusprogramme);
  }

  bearbeiten(bonusprogrammID) {
    console.log("Nutzer will das Bonusprog. " + bonusprogrammID)+ " bearbeiten";
    this.bonusprogrammObservable = this.bonusService.getBonusprogrammByID(bonusprogrammID);
    this.bonusprogrammObservable.subscribe(data => {
      if(data == null) {
        this.isEmpty = true;
        return;
      } else {
        this.isEmpty = false;
      }
      this.chosenBonusprogramm = data;
      console.dir(this.chosenBonusprogramm);
      this.zeigeBearbeitenOverlay = true;
    });
  }

  archivieren(bonusprogrammID) {
    this.willBonusprogrammLoeschen = true;
    this.message = bonusprogrammID;
  }

  recieveDone($event) {
    this.updateBonusprogrammeOnEvent();
  }

  ausschuetten(bonusprogrammID) {
    console.log("Nutzer will das Bonusprog. " + bonusprogrammID)+ " ausschutten";
    let newBonusprogrammObservable : Observable<Bonusprogramm>;
    newBonusprogrammObservable = this.bonusService.getBonusprogrammByID(3);
    newBonusprogrammObservable.subscribe(data => {
      this.fuerZutreffendeNutzer_InsertProfitiertVonBonusprogramm( data[0].kategorieID, data[0].punkte_in_kategorie, bonusprogrammID );
    });
  }

  private fuerZutreffendeNutzer_InsertProfitiertVonBonusprogramm(kategorie: any, min_punkte: number, bonusprogrammID: number) {
    // zuerst get zutreffende Nutzer
    let tugendhafteObservable : Observable<Buerger[]>;
    tugendhafteObservable = this.bonusService.getTugendhafteErfuellenBonusprogramm(kategorie, min_punkte);
    tugendhafteObservable.subscribe(data => {
      // console.log("Tugendhafte, die Bonusprogramm erfüllen:");
      // console.dir(data);
      this.insertProfitiertVonBonusProgramm(data, bonusprogrammID);
    });
  }

  private insertProfitiertVonBonusProgramm(tugendhafte_ids, bonusprogrammID: number){
    let bonusService = this.bonusService;
    let messageService = this.messageService;
    let websocketService = this.websocketService;
    let observable  : Observable<any[]>;
    tugendhafte_ids.forEach(function (value) {
     // console.log("in set profitiert"+value.tugendhafterID);
      observable = bonusService.newProfitiertVonBonusprogrammEintragen(value.tugendhafterID, bonusprogrammID);
      observable.subscribe(data =>{ console.dir(data);
        messageService.setMessage("Bonus wurde an Tugendhafte ausgeschüttet", true);
        websocketService.SendNeueBeachrichtigung(value.tugendhafterID);
      });
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
