import { Buerger } from './../../models/Buerger';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
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
  typeTemp = "tugendhafter";
  aktuellerNutzer: Buerger;
  nutzer: Buerger;

  constructor(private kategorienService: KategorieService,  private authService: AuthService) {
     this.getAktuellenNutzer();
     console.log('dashboard: logged in?');
    console.log(this.authService.isLoggedIn());

  }

  ngOnInit(): void {
    this.getKategorien();
  }

  changeType(typ: string){
    this.type = typ;
  }

  changeTypeTemp(typ: string){
    this.typeTemp = typ;
  }


  getAktuellenNutzer(){
    this.authService.getAngemeldeterNutzer().subscribe((dataNutzer: Buerger) => {
    this.nutzer = dataNutzer;
   });
  //  this.nutzer = this.authService.getNutzer();
    console.log('dasboard get akt nutzer:');
    console.log(this.nutzer);
  }

  getKategorien(){
    this.kategorien = this.kategorienService.getKategorien();

    this.kategorien.subscribe(data => {
      console.log(data); });
   // console.log('Test, this.kategorien: ');
   // console.log(this.kategorien);
  }


}
