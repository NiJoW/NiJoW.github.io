import { AuthService } from './services/auth.service';
import { Buerger } from './models/Buerger';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { DienstService } from './services/dienst.service';
import { Observable } from 'rxjs';
import { Dienst } from './models/Dienst';
import { BonusService } from './services/bonus.service';
import {DoUpdateService} from "./services/do-update.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fantasy-score-app';
  nutzer: Buerger;
  willAnmelden: boolean = false;
  willRegistrieren: boolean = false;
  hasMessage: boolean = false;
  messageAmount = 0;
  angefragteDiensteObservable: Observable<Dienst[]>;
  homeIcon = faHome;


  constructor(private router: Router,
    private authService: AuthService,
    private dienstService: DienstService,
    private bonusService: BonusService,
    private updateService: DoUpdateService) {
    this.getAktuellenNutzer();
  }

  ngOnInit(): void {
  //  this.getAnzahlBenachrichtigungen();
   // console.log(' amount '+this.messageAmount);
    this.updateService.currentDoUpdateState_AnzahlBenachrichtigungen.subscribe(message =>
      {this.getAnzahlBenachrichtigungen(); }
    );
  }


  getAnzahlBenachrichtigungen(){
    this.messageAmount = 0; // zurück auf 0 setzen, für erneute Aufrufe bei Update
    // Benachrichtungen zu angefragten Diensten
    this.angefragteDiensteObservable = this.dienstService.getAnfragenAnTugendhaften();
    this.angefragteDiensteObservable.subscribe(data => {
      if(data.length != 0 ) {
        this.messageAmount += data.length;
        this.hasMessage = true;
      }
    });
    // Benachrichtungen zu neuen Bonusprogrammen, von denen User profitiert
    let amountMessagesBonus : Observable<number>;
    amountMessagesBonus = this.bonusService.getBonusBenachrichtigungenUngelesen();
    amountMessagesBonus.subscribe(data => {
      this.messageAmount += data[0].anzahl_ungelesen;
    });
  }

  get isLoggedIn() {
    const isLoggedIn = this.authService.isLoggedIn();
    if(isLoggedIn){ this.nutzer = this.authService.getNutzer(); }
    return isLoggedIn;
  }

  login() {
    this.willAnmelden = true;
  }

  registrieren() {
    this.willRegistrieren = true;
  }

  logout() {
    this.router.navigate(['/']);
    this.authService.logout();
    window.location.reload();
  }

  getAktuellenNutzer(){
    this.nutzer = this.authService.getNutzer();
  }
}
