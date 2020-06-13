import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BuergerTyp } from './../../models/BuergerTyp.enum';
import { AuthService } from './../../services/auth.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-anmelden',
  templateUrl: './anmelden.component.html',
  styleUrls: ['./anmelden.component.css']
})
export class AnmeldenComponent implements OnInit {

  anmeldenForm;
  Typ = BuergerTyp;
  fehler = false;

  @Output() onClose = new EventEmitter();

  constructor(private router: Router, private authService: AuthService,
              private formBuilder: FormBuilder) {
    this.anmeldenForm = this.formBuilder.group({
      benutzername: '',
      passwort: ''
    });
  }

  ngOnInit(): void {
  }

  login(anmeldenDaten) {
    this.authService.login(this, anmeldenDaten.benutzername, anmeldenDaten.passwort);
    this.onClose.emit(null); 
  }

  navigiere(){
    this.router.navigate(['/']);
  }

  fehlerAnzeigen(){
    this.fehler = true;
    console.warn('Nutzerdaten nicht korrekt!');
  }

  cancel() {
    console.log("close Modal");
    this.onClose.emit(null); 
  }
}


