import { AuthService } from './services/auth.service';
import { Buerger } from './models/Buerger';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fantasy-score-app';
  nutzer: Buerger;
  faCoffee = faCoffee;

  constructor(private router: Router, private authService: AuthService) {
    this.getAktuellenNutzer();
  }

  get isLoggedIn() {
    const isLoggedIn = this.authService.isLoggedIn();
    if(isLoggedIn){ this.nutzer = this.authService.getNutzer(); }
    return isLoggedIn;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  getAktuellenNutzer(){
    this.nutzer = this.authService.getNutzer();
  }
}
