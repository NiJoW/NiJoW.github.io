import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { FormBuilder } from '@angular/forms';
import { BuergerTyp } from 'src/app/models/BuergerTyp.enum';

@Component({
  selector: 'app-registrieren',
  templateUrl: './registrieren.component.html',
  styleUrls: ['./registrieren.component.css']
})
export class RegistrierenComponent implements OnInit {

  registrierenForm;
  nutzer = true;
  email = true;
  passwort = true;

  constructor(private router: Router, private authService: AuthService,
    private formBuilder: FormBuilder) {
      this.registrierenForm = this.formBuilder.group({
        benutzername: '',
        email: '',
        passwort: '',
        passwort2: ''
      });
     }

  ngOnInit(): void {
  }

  registrieren(registrierenDaten) {
    if(this.loginKorrekt(registrierenDaten.email, registrierenDaten.passwort, registrierenDaten.passwort2)) {
      console.log("Daten Korrect");
      this.authService.registrieren(this, registrierenDaten.benutzername, registrierenDaten.passwort, registrierenDaten.email, BuergerTyp.Tugendhafter);
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
