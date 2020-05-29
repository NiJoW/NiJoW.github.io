import { Buerger } from './../../models/Buerger';
import { BuergerService } from './../../services/buerger.service';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit, OnChanges {

  constructor(private buergerService: BuergerService, private authService: AuthService) { }

  buergerListe: Observable<Buerger[]>;
  aktuellerNutzer: string;

  ngOnInit(): void {
    this.buergerListe = this.buergerService.getBuerger();

    this.buergerListe.subscribe(data => {
      console.log(data); });
    console.log(this.buergerListe);
   this.aktuellerNutzer = "Bürger";
  }

  ngOnChanges():void {
    this.aktuellerNutzer = this.authService.getBuerger().benutzername;
    console.log("aktuellerNutzer: " + this.aktuellerNutzer);
  }

  update() {
    this.aktuellerNutzer = this.authService.getBuerger().benutzername;
    console.log("aktuellerNutzer: " + this.aktuellerNutzer);
  }


}




