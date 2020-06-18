import { async } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { Buerger } from '../models/Buerger';
import { BuergerTyp } from '../models/BuergerTyp.enum';
import { BuergerService} from './buerger.service';
import {AnmeldenComponent} from "../modules/anmelden/anmelden.component";
import { RegistrierenComponent } from '../modules/registrieren/registrieren.component';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private nutzer: Buerger;
  private benutzerObservable: Observable<Buerger[]>;
  private scoreObservable: Observable<Buerger[]>;




  constructor(private buergerService: BuergerService) {
    // console.log('authService: isLoggedIn():');
    // console.log(this.isLoggedIn());
    if(this.isLoggedIn()){
      this.nutzer  = JSON.parse(sessionStorage.loggedInUser);
    }
  }

  isLoggedIn() {
    if(sessionStorage.getItem('loggedInUser')!=undefined){
      return true;
    }
    return false;
  }

  getNutzer(){
    return this.nutzer;
  }

  isTyp(typ: BuergerTyp) {
      return this.isLoggedIn() && this.nutzer.typ === typ;
  }

  login(komponent: AnmeldenComponent, benutzername: string, passwort: string): any {
    this.benutzerObservable = this.buergerService.getBuergerByLoginData(benutzername, passwort);
    this.benutzerObservable.subscribe(data => {
      if (data != null  && !(data.length === 0)){
        komponent.cancel();
        this.nutzer = data[0];
        console.dir(data[0]);

        sessionStorage.setItem('loggedInUser', JSON.stringify(data[0]));
        console.log(sessionStorage.getItem('loggedInUser'));
        
        komponent.navigiere();
      } else {
        komponent.fehlerAnzeigen();
      }
    } );
  }

  logout() {
    this.nutzer = null;
    sessionStorage.removeItem('loggedInUser');
  }



  registrieren(komponent: RegistrierenComponent, benutzername: string, passwort: string, email: string, typ: BuergerTyp) {
    console.log("In auth.service.ts -> registrieren");
    const newBuerger =  new Buerger(benutzername, passwort, email, typ);
    //console.dir(newBuerger);
    this.benutzerObservable = this.buergerService.getBuergerByBenutzername(benutzername); // Get alle buerger mit eingegebenen Benutzername
      this.benutzerObservable.subscribe(data => {
        if (data == null  || data.length === 0) { // Benutzername noch nicht verwendet
          this.benutzerObservable = this.buergerService.addBuerger(newBuerger);
          this.benutzerObservable.subscribe(data => {
            if (data != null  && !(data.length === 0)){
              this.nutzer = data[0];
              //console.dir(data[0]);

              console.log(data);
              var myInsertId = 0;
              Object.keys(data).forEach(function(key) {
                if(key=='insertId')
                {  myInsertId = data[key]; }
              });
              if(typ === "Tugendhafter") { 
                this.scoreObservable = this.buergerService.newSocialScoreAnlegen(myInsertId);
                this.scoreObservable.subscribe(data => {

                });
              }
              komponent.cancel();
              komponent.navigiere();
            }
          });
        } else { // Benutzername bereits verwendet
          console.dir(data[0]);
          komponent.benutzernameVorhanden();
        }
      });
  }
}

