import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Buerger } from 'src/app/models/Buerger';

@Component({
  selector: 'app-anmelden',
  templateUrl: './anmelden.component.html',
  styleUrls: ['./anmelden.component.css']
})
export class AnmeldenComponent implements OnInit {
  
  aktuellerNutzer: Buerger;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  login(benutzername: string, passwort: string) {
    this.authService.inputValid(benutzername, passwort);
    this.authService.login(benutzername, passwort);
    this.router.navigate(['/']);
  }
}


