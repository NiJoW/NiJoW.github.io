import { Injectable } from '@angular/core';
import { Buerger } from '../models/Buerger';
import { BuergerTyp } from '../models/BuergerTyp.enum';
import { BuergerService} from './buerger.service';
import {Observable} from "rxjs";
import {Tugend} from "../models/Tugend";
import {empty} from "rxjs/internal/Observer";
import {AnmeldenComponent} from "../modules/anmelden/anmelden.component";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private nutzer: Buerger;
  private benutzerObservable: Observable<Buerger[]>;

  constructor(private buergerService: BuergerService) { }

  isLoggedIn() {
      return !!this.nutzer;
  }

  isTyp(typ: BuergerTyp) {
      return this.isLoggedIn() && this.nutzer.typ === typ;
  }

  login(Komponente: AnmeldenComponent, benutzername: string, passwort: string): any {
    this.benutzerObservable = this.buergerService.getBuergerByLoginData(benutzername, passwort);
    this.benutzerObservable.subscribe(data => {
      if (data != null  && !(data.length === 0)){
        this.nutzer = data[0];
        console.dir(data[0]);
        Komponente.navigiere();
        // return true;
      } else {
        Komponente.fehlerAnzeigen();
        // return false;
      }
    } );
  }

  logout() {
    this.nutzer = null;
  }
}

