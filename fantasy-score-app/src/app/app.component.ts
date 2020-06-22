import { AuthService } from './services/auth.service';
import { Buerger } from './models/Buerger';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { DienstService } from './services/dienst.service';
import { Observable } from 'rxjs';
import { Dienst } from './models/Dienst';
import { Bonusprogramm } from './models/Bonusprogramm';
import { BonusService } from './services/bonus.service';

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
  messageAnount = 0; //TODO: update nachdem gelesen wurde
  angefragteDiensteObservable: Observable<Dienst[]>;
  betroffeneProgramme: Observable<Bonusprogramm[]>;
  homeIcon = faHome;


  constructor(private router: Router, 
    private authService: AuthService,
    private dienstService: DienstService,
    private bonusService: BonusService) {
    this.getAktuellenNutzer();
  }

  ngOnInit(): void {
    this.angefragteDiensteObservable = this.dienstService.getAnfragenAnTugendhaften();
    this.angefragteDiensteObservable.subscribe(data => {
      if(data.length != 0 ) {
        this.messageAnount += data.length;
        this.hasMessage = true;
      } 
    });
    this.betroffeneProgramme = this.bonusService.getBonusprogrammeVonNutzer(); //TODO: getBonusprogrammeVonNutzer funktioniert noch nicht
      this.betroffeneProgramme.subscribe(data => {
        if(data.length != 0 ) {
          this.messageAnount += data.length;
          this.hasMessage = true;
          console.dir(data);
        }
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
    this.authService.logout();
    this.router.navigate(['/']);
    window.location.reload();
  }

  getAktuellenNutzer(){
    this.nutzer = this.authService.getNutzer();
  }
}
