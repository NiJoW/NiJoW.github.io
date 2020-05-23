import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fantasy-score-app';

  constructor(private router: Router, private authService: AuthService) { }

  get isAuthorized() {
    return this.authService.isAuthorized(); 
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
