import { Component, OnInit, TemplateRef } from '@angular/core';
import { BuergerTyp } from './../../models/BuergerTyp.enum';
import { Buerger } from './../../models/Buerger';
import { AuthService } from './../../services/auth.service';
import {KategorieService} from '../../services/kategorie.service';
import {Kategorie} from '../../models/Kategorie';
import {Observable} from 'rxjs';
import { NgIf } from '@angular/common';


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

 constructor(private kategorienService: KategorieService,  private authService: AuthService) {
     this.getAktuellenNutzer();
     // console.log('dashboard: logged in?');
     // console.log(this.authService.isLoggedIn());
  }

  ngOnInit(): void {
    this.getKategorien();
    this.typeUser = this.authService.getNutzer().typ;
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


}


