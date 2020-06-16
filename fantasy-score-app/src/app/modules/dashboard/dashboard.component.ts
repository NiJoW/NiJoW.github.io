import { Router } from '@angular/router';
import { BuergerService } from './../../services/buerger.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BuergerTyp } from './../../models/BuergerTyp.enum';
import { Buerger } from './../../models/Buerger';
import { AuthService } from './../../services/auth.service';
import {KategorieService} from '../../services/kategorie.service';
import {Kategorie} from '../../models/Kategorie';
import {Observable} from 'rxjs';
import { NgIf } from '@angular/common';
import { DienstService } from 'src/app/services/dienst.service';
import { Dienst } from 'src/app/models/Dienst';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  kategorien: Observable<Kategorie[]>;
  type = "tugenden";
  typeUser: BuergerTyp;
  aktuellerNutzer: Buerger;
  nutzer: Buerger;
  buergerListe: Observable<Buerger[]>;
  hatAngefragteDienste: boolean;
  angefragteDiensteObservable: Observable<Dienst[]>;
  angefragteDienste: Dienst[];
  unlockClicked = false;


  constructor(private kategorienService: KategorieService, 
    private dienstService: DienstService, 
    private authService: AuthService, 
    private buergerService: BuergerService,
    private router: Router) {
    
     this.getAktuellenNutzer();
     // console.log('dashboard: logged in?');
     // console.log(this.authService.isLoggedIn());
  }

  ngOnInit(): void {
    this.getKategorien();
    this.typeUser = this.authService.getNutzer().typ;
    this.buergerListe = this.buergerService.getBuerger();

    this.buergerListe.subscribe(data => {
      console.log(data); });
    console.log(this.buergerListe);

    this.hatAngefragteDienste = false;
    this.angefragteDiensteObservable = this.dienstService.getAnfragenAnTugendhaften();
    this.angefragteDiensteObservable.subscribe(data => {
      if(data.length != 0 ) {
        this.angefragteDienste = data;
        this.hatAngefragteDienste = true;
        console.dir(data);
      }
    })
  }

  changeType(typ: string){
    this.type = typ;
  }

  isTyp(typ: string) : boolean {
    return this.authService.getNutzer().typ+"" == typ;
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
    if (confirm("Bist du dir sicher, dass du ein Tugendhafter werden möchtest?")) {
      this.buergerService.unlockTugendhafter(this.nutzer.id_buerger).subscribe(data => {
        console.log(data);
      });
      this.buergerService.newSocialScoreAnlegen(this.nutzer.id_buerger).subscribe(data => {
        console.log(data);
      });
      alert("Sie müssen sich erneut einloggen!");
      this.logout();
      
    } else {
      
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
    window.location.reload();

  }
}


