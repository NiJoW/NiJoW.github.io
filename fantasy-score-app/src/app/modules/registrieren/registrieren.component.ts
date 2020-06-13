import { BuergerTyp } from './../../models/BuergerTyp.enum';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { FormBuilder } from '@angular/forms';
import { BuergerService } from 'src/app/services/buerger.service';

@Component({
  selector: 'app-registrieren',
  templateUrl: './registrieren.component.html',
  styleUrls: ['./registrieren.component.css']
})
export class RegistrierenComponent implements OnInit {

  registrierenForm;
  nutzer;
  email;
  passwort;
  requestedType: BuergerTyp;

  constructor(private router: Router, private authService: AuthService,
    private formBuilder: FormBuilder, private buergerService: BuergerService) {
      this.registrierenForm = this.formBuilder.group({
        benutzername: '',
        email: '',
        passwort: '',
        passwort2: '',
        requestedType: BuergerTyp.Tugendhafter
      });
      this.requestedType = BuergerTyp.Tugendhafter;
      this.nutzer = true;
      this.email = true;
      this.passwort = true;
     }

  ngOnInit(): void {
  }

  registrieren(registrierenDaten) {
    this.email = true;
    this.nutzer = true;
    this.passwort = true;
    this.requestedType;
    if(this.loginKorrekt(registrierenDaten.email, registrierenDaten.passwort, registrierenDaten.passwort2)) {
      console.log("Daten Korrekt");
      this.authService.registrieren(this, registrierenDaten.benutzername, registrierenDaten.passwort, registrierenDaten.email, this.requestedType);
    }
    //if(this.requestedType == "Tugendhafter") {
     //this.buergerService.newSocialScoreAnlegen();
    //}
  }

  changeType(event: any){
    console.log(event.target.value);
    if(event.target.value == "Tugendhafter") {
      this.requestedType = BuergerTyp.Tugendhafter;
      console.log(event.target.value);
      console.log(this.requestedType);
    }
    if(event.target.value == "Suchender") {
      this.requestedType = BuergerTyp.Suchender;
      console.log(event.target.value);
      console.log(this.requestedType);
    }
    if(event.target.value == "Aeltester") {
      this.requestedType = BuergerTyp.Aeltester;
      console.log(event.target.value);
      console.log(this.requestedType);
    }
  }

  private loginKorrekt(email: string, passwort: string, passwort2:string): boolean {
    if(passwort == passwort2) {
      if(email.includes('@') && email.includes('.')) {
        return true;
      } else {
        this.email = false;
        console.log("email falsch");
      }
    } else {
      this.passwort = false;
      console.log("passwort falsch");
    }
    return false;
  }

  navigiere(){
    this.router.navigate(['/']);
    //this.bannerComponent.updateBanner();
  }

  benutzernameVorhanden() {
    this.nutzer = false;
  }

}
