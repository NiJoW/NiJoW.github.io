import { Buerger } from './../../models/Buerger';
import { BuergerService } from './../../services/buerger.service';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { faAward, faPiggyBank, faPencilAlt, faHandshake, faTrophy, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  constructor(private buergerService: BuergerService, 
    private authService: AuthService) { }

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

  ngOnInit(): void {
    this.nutzer = this.authService.getNutzer();
    if(this.nutzer.typ == "Tugendhafter") {
      this.socialScore = this.buergerService.getSocialScoreFromId(this.nutzer.id_buerger);
      this.socialScore.subscribe(data =>{
        this.nutzer.social_score = data[0].social_score;
        console.dir(this.nutzer);
      });
    }
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  bearbeiten(): void {
    //TODO: Email, Passwort aendern
    this.willBearbeiten = true;
  }

}




