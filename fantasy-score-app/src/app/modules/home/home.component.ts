import { BuergerTyp } from './../../models/BuergerTyp.enum';
import { Buerger } from './../../models/Buerger';
import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  typeUser: BuergerTyp;
  nutzer: Buerger;

  constructor(private authService: AuthService,
              private router: Router) {
    console.log('home: logged in? :');
    console.log(authService.isLoggedIn());
    this.getAktuellenNutzer();
  }


  ngOnInit(): void {
    this.typeUser = this.authService.getNutzer().typ;
  }


  isTyp(typ: string) : boolean {
    return this.authService.getNutzer().typ+"" == typ;
  }


  getAktuellenNutzer(){
    this.nutzer = this.authService.getNutzer();
  }

}
