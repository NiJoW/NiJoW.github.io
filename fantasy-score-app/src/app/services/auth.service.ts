import { Injectable } from '@angular/core';
import { Buerger } from '../models/Buerger';
import { BuergerTyp } from '../models/BuergerTyp.enum';
import { BuergerService } from './buerger.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private nutzer: Buerger;

  isLoggedIn() {
      return !!this.nutzer;
  }

  isTyp(typ: BuergerTyp) {
      return this.isLoggedIn() && this.nutzer.typ === typ;
  }

  inputValid(benutzername, passwort): boolean { //true, wennBenutzer und Paswort stimmen
    user: Buerger = BuergerService.getBuergerByBenutzername(benutzername);
    if(user != null) {
      return user;
    } else {
      console.log("Login fehlgeschlagen");
    }
  }

  login(_benutzername: string, _passwort: string) {
    console.log("login as " + _benutzername);
    this.nutzer = {
      id_buerger: 99, 
      benutzername: _benutzername,
      passwort: _passwort,
      email_adresse: 'test@test.de', 
      typ: typ
    };
  }

  logout() {
    this.nutzer = null;
  }
}

