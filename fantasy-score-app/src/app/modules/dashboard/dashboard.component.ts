import { Component, OnInit, TemplateRef } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { BuergerTyp } from './../../models/BuergerTyp.enum';
import { Buerger } from './../../models/Buerger';
import { AuthService } from './../../services/auth.service';
import {KategorieService} from '../../services/kategorie.service';
import {Kategorie} from '../../models/Kategorie';
import {Observable} from 'rxjs';
import { NgIf } from '@angular/common';
import {OverlayService} from '../overlay/overlay.service';
import { SubscribeComponent } from '../overlay/subscribe/subscribe.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  kategorien: Observable<Kategorie[]>;
  subscribeComponent = SubscribeComponent;
  content = 'A simple string content modal overlay';
  subscribeData = null;
  type = "tugenden";
  typeUser: BuergerTyp;
  aktuellerNutzer: Buerger;
  nutzer: Buerger;

 constructor(private kategorienService: KategorieService, private overlayService: OverlayService, private authService: AuthService) {
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

  open(content: TemplateRef<any> | ComponentType<any> | string) {
    const ref = this.overlayService.open(content, null);

    ref.afterClosed$.subscribe(res => {
      if (content === this.subscribeComponent) {
        this.subscribeData = res.data;
      }
    });
  }

}


