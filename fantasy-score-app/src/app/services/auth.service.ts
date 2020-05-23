import { Injectable } from '@angular/core';
import { Buerger } from '../models/Buerger';
import { BuergerTyp } from '../models/BuergerTyp.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: Buerger;

  isAuthorized() {
      return !!this.user;
  }

  isTyp(role: BuergerTyp) {
      return this.isAuthorized() && this.user.typ === role;
  }

  login(role: BuergerTyp) {
    console.log("login as " + role);
    this.user = {typ: role};
  }

  logout() {
    this.user = null;
  }
}

