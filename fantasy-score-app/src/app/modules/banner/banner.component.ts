import { Buerger } from './../../models/Buerger';
import { BuergerService } from './../../services/buerger.service';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { faAward, faPiggyBank, faPencilAlt, faHandshake, faTrophy, faUser } from '@fortawesome/free-solid-svg-icons';
import { DoUpdateService } from 'src/app/services/do-update.service';
import { Dienst } from 'src/app/models/Dienst';
import { DienstService } from 'src/app/services/dienst.service';
import { BonusService } from 'src/app/services/bonus.service';
import { BonusBenachrichtigung } from 'src/app/models/BonusBenachrichtigung';
import { Tugend } from 'src/app/models/Tugend';
import { TugendService } from 'src/app/services/tugend.service';
import { Bonusprogramm } from 'src/app/models/Bonusprogramm';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  constructor(private buergerService: BuergerService, 
    private authService: AuthService,
    private doUpdateService: DoUpdateService,
    private dienstService: DienstService,
    private bonusService: BonusService, 
    private tugendService: TugendService) { }

  nutzer:Buerger;
  socialScore: Observable<number>;
  willBearbeiten = false;
  awardIcon = faAward;
  piggyIcon = faPiggyBank;
  handshakeIcon = faHandshake;
  trophyIcon = faTrophy;
  userIcon = faUser;
  editIcon = faPencilAlt;
  dienstAnzahl = 0;
  boniAnzahl = 0;
  tugendAnzahl = 0;
  gebuchteDienstAnzahl = 0;

  ngOnInit(): void {
    this.nutzer = this.authService.getNutzer();
    if(this.nutzer == null) {
      return;
    }
    if(this.nutzer.typ == "Tugendhafter") {
      this.doUpdateService.currentDoUpdateState_SocialScore.subscribe(message =>
        {this.getSocialScore(); }
      );
      this.doUpdateService.currentDoUpdateState_AnzahlErfuellteDienste.subscribe(data => {
        this.getErfuellteDienstAnzahl();
      });

      let bonusObservable: Observable<BonusBenachrichtigung[]>;
      bonusObservable = this.bonusService.getBonusBenachrichtigungAlleFuerNutzer();
      bonusObservable.subscribe(data => {
        this.boniAnzahl = data.length;
      });
    } else if(this.nutzer.typ == "Aeltester") {
      this.doUpdateService.currentDoUpdateState_AnzahlErstellteTugenden.subscribe(data => { 
        this.getErstelleTugenden();
      });
      this.doUpdateService.currentDoUpdateState_AnzahlErstellteBonis.subscribe(data => {
        this.getErstellteBonis();
      });
    } else {
      let dienstObservable: Observable<Dienst[]>;
      dienstObservable = this.dienstService.getGebuchteDienste();
      dienstObservable.subscribe(data => {
        this.gebuchteDienstAnzahl = data.length;
      });
    }
  }

  getErstellteBonis() {
    let boniObservable: Observable<Bonusprogramm[]>;
    boniObservable = this.bonusService.getSelbstErstellteBonusprogramme();
    boniObservable.subscribe(data => {
      this.boniAnzahl = data.length;
    })
  }

  getErstelleTugenden() {
    let tugendObservable: Observable<Tugend[]>;
    tugendObservable = this.tugendService.getErstellteTugenden();
    tugendObservable.subscribe(data => {
      this.tugendAnzahl = data.length;
    })
  }

  getErfuellteDienstAnzahl() {
    let dienstObservable: Observable<Dienst[]>;
    dienstObservable = this.dienstService.getErledigteDienste();
    dienstObservable.subscribe(data => {
      this.dienstAnzahl = data.length;
    });
  }

  getSocialScore() {
    this.socialScore = this.buergerService.getSocialScoreFromId(this.nutzer.id_buerger);
      this.socialScore.subscribe(data =>{
        this.nutzer.social_score = data[0].social_score;
      });
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  bearbeiten(): void {
    //TODO: Email, Passwort aendern
    this.willBearbeiten = true;
  }

}




