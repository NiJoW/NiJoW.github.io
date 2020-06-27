import { Router } from '@angular/router';
import { BuergerService } from './../../services/buerger.service';
import { Component, OnInit } from '@angular/core';
import { BuergerTyp } from './../../models/BuergerTyp.enum';
import { Buerger } from './../../models/Buerger';
import { AuthService } from './../../services/auth.service';
import {KategorieService} from '../../services/kategorie.service';
import {Kategorie} from '../../models/Kategorie';
import {Observable} from 'rxjs';
import { DienstService } from 'src/app/services/dienst.service';
import { Dienst } from 'src/app/models/Dienst';
import { Bonusprogramm } from 'src/app/models/Bonusprogramm';
import { BonusService } from 'src/app/services/bonus.service';
import {BonusBenachrichtigung} from "../../models/BonusBenachrichtigung";
import { faLock } from '@fortawesome/free-solid-svg-icons';
import {DoUpdateService} from "../../services/do-update.service";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  kategorien: Observable<Kategorie[]>;
  type = "tugenden";
  typeAeltester = "aktuell";
  typeUser: BuergerTyp;
  aktuellerNutzer: Buerger;
  nutzer: Buerger;
  hatAngefragteDienste: boolean;
  angefragteDiensteObservable: Observable<Dienst[]>;
  angefragteDienste: Dienst[];
  unlockClicked = false;
  betroffeneProgramme: Observable<BonusBenachrichtigung[]>;
  erhaeltBonus: boolean = false;
  unlockIcon = faLock;

  willFreischalten = false;


  constructor(private kategorienService: KategorieService,
    private dienstService: DienstService,
    private bonusService: BonusService,
    private authService: AuthService,
    private buergerService: BuergerService,
    private router: Router,
    private updateService: DoUpdateService) {

     this.getAktuellenNutzer();
     // console.log('dashboard: logged in?');
     // console.log(this.authService.isLoggedIn());
  }

  ngOnInit(): void {
    this.getKategorien();
    this.typeUser = this.authService.getNutzer().typ;

    this.setUpBonus();
    this.setUpAngefragteDienste();
  }

  private setUpAngefragteDienste(){
    this.getAngefragteDienste();
    this.updateService.currentDoUpdateState_Anzeige_DienstanfrageBenachrichtigungen.subscribe(message =>
      {this.getAngefragteDienste();}
    );
  }

  private setUpBonus(){
    this.getBonusBenachrichtigungUngelesenFuerNutzer();
    this.updateService.currentDoUpdateState_Anzeige_BonusBenachrichtigungen.subscribe(message =>
      {this.getBonusBenachrichtigungUngelesenFuerNutzer();}
    );
  }

  getAngefragteDienste(){
    this.hatAngefragteDienste = false;
    this.angefragteDiensteObservable = this.dienstService.getAnfragenAnTugendhaften();
    this.angefragteDiensteObservable.subscribe(data => {
      if(data.length != 0 ) {
        this.angefragteDienste = data;
        this.hatAngefragteDienste = true;
        // console.dir(data);
      }
    });
  }

  getBonusBenachrichtigungUngelesenFuerNutzer(){
    this.betroffeneProgramme = new Observable<BonusBenachrichtigung[]>();
    this.betroffeneProgramme = this.bonusService.getBonusBenachrichtigungUngelesenFuerNutzer();
    this.betroffeneProgramme.subscribe(data => {
      if(data.length != 0 ) {
        this.erhaeltBonus = true;
      //  console.dir(data);
      }
    })
  }

  changeType(typ: string){
    this.type = typ;
  }

  isTyp(typ: string) : boolean {
    return this.authService.getNutzer().typ+"" == typ;
  }

  changeTypeAeltester(typ: string){
    this.typeAeltester = typ;
  }


  getAktuellenNutzer(){
    this.nutzer = this.authService.getNutzer();
  }

  getKategorien(){
    this.kategorien = this.kategorienService.getKategorien();

    this.kategorien.subscribe(data => { });
   // this.kategorien.subscribe(data => {
   //   console.log(data); });
   // console.log('Test, this.kategorien: ');
   // console.log(this.kategorien);
  }

  closeAnfrage(dienstID) {
    console.log(dienstID);
  }

  unlockTugendhafter() {
    this.willFreischalten = true;
    /* if (confirm("Bist du dir sicher, dass du ein Tugendhafter werden möchtest?")) {
      this.buergerService.unlockTugendhafter(this.nutzer.id_buerger).subscribe(data => {
        console.log(data);
      });
      this.buergerService.newSocialScoreAnlegen(this.nutzer.id_buerger).subscribe(data => {
        console.log(data);
      });
      alert("Sie müssen sich erneut einloggen!");
      this.logout();

    } else {

    } */
  }


  updateViewBonusNachricht() {
    //console.log("updateViewBonusNachrichtGeschlossen");
    this.getBonusBenachrichtigungUngelesenFuerNutzer();
  }
}


