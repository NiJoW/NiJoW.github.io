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
  public nutzer: Buerger;

  constructor(private kategorienService: KategorieService, private authService: AuthService) { }

  ngOnInit(): void {
    this.kategorien = this.kategorienService.getKategorien();

    this.kategorien.subscribe(data => {
      console.log(data); });
    console.log('Test, this.kategorien: ');
    console.log(this.kategorien);
    
    
    this.authService.getAngemeldeterNutzer().subscribe((Blanutzer: Buerger) => {
      this.nutzer = Blanutzer;
      console.log('In dasboard ist angemeldeter Nutzer angekommen:');
      console.log(this.nutzer.benutzername);
    })
  }

  changeType(typ: string){
    this.type = typ; 
  }

  changeTypeTemp(typ: string){
    this.typeTemp = typ; 
  }

  /*getAktuellenNutzer(){
    this.aktuellerNutzer=this.authService.getBuerger();
    console.log(this.aktuellerNutzer.id_buerger);
  }*/
    


}