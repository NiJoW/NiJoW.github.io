import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BuergerTyp } from './../../models/BuergerTyp.enum';
import { AuthService } from './../../services/auth.service';
import {FormBuilder} from '@angular/forms';
import { BannerComponent } from '../banner/banner.component';

@Component({
  selector: 'app-anmelden',
  templateUrl: './anmelden.component.html',
  styleUrls: ['./anmelden.component.css']
})
export class AnmeldenComponent implements OnInit {

  anmeldenForm;
  Typ = BuergerTyp;
  fehler = false;

  constructor(private router: Router, private authService: AuthService,
              private formBuilder: FormBuilder) {
    this.anmeldenForm = this.formBuilder.group({
      benutzername: '',
      passwort: ''
    });
  }

  ngOnInit(): void {
  }

  loginUrsprung(role: BuergerTyp) {
  //  this.authService.login(role);
    this.router.navigate(['/']);
  }

  login(anmeldenDaten) {
    this.authService.login(this, anmeldenDaten.benutzername, anmeldenDaten.passwort);
  }

  navigiere(){
    this.router.navigate(['/']);
    //this.bannerComponent.updateBanner();
  }

  fehlerAnzeigen(){
    this.fehler = true;
    console.warn('Nutzerdaten nicht korrekt!');
  }
}


