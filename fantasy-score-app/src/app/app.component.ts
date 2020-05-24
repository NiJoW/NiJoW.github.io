import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service'
import { Buerger } from './models/Buerger';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fantasy-score-app';
  aktuellerNutzer: Buerger;

  constructor(private router: Router, private authService: AuthService) { }

  get isLoggedIn() {
    return this.authService.isLoggedIn(); 
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
