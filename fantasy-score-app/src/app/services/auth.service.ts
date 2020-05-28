import { Injectable } from '@angular/core';
import { Buerger } from '../models/Buerger';
import { BuergerTyp } from '../models/BuergerTyp.enum';

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

  login(typ: BuergerTyp) {
    console.log("login as " + typ);
    this.nutzer = {
      id_buerger: 99, 
      benutzername: 'testUser',
      passwort: 'test',
      email_adresse: 'test@test.de', 
      typ: typ
    };
  }

  logout() {
    this.nutzer = null;
  }
}

