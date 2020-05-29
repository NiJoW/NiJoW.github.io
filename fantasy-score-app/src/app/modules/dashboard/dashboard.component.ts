import { Buerger } from './../../models/Buerger';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import {KategorieService} from '../../services/kategorie.service';
import {Kategorie} from '../../models/Kategorie';
import {Observable} from 'rxjs';
import { NgIf } from '@angular/common';
import { AngeboteneDiensteComponent } from './angebotene-dienste/angebotene-dienste.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  kategorien: Observable<Kategorie[]>;
  type = "tugenden";
  aktuellerBuerger: Buerger;
  

  constructor(private kategorienService: KategorieService, private angeboteneDienste: AngeboteneDiensteComponent, private authService: AuthService) { }

  ngOnInit(): void {
    this.kategorien = this.kategorienService.getKategorien();

    this.kategorien.subscribe(data => {
      console.log(data); });
    console.log('Test, this.kategorien: ');
    console.log(this.kategorien);
  }

  changeType(typ: String){
    if(this.type != typ) {
      if(this.type === "tugenden") {
        this.type = "dienste";
      } else if (this.type === "dienste") {
        this.type = "tugenden";
        this.aktuellerBuerger = this.authService.getBuerger();
        this.angeboteneDienste.updateAngeboteneDienste(this.aktuellerBuerger.id_buerger);
      }
    }
  }
}

