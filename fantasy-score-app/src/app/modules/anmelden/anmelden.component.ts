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
  message = " ";

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
  }

  navigiere(){
    this.router.navigate(['/']);
    window.location.reload();
  }

  fehlerAnzeigen(){
    this.message = "Angegebener der Benutzername oder das Passwort ist leider falsch!";
    console.warn('Nutzerdaten nicht korrekt!');
  }

  cancel() {
    console.log("close Modal");
    this.onClose.emit(null); 
  }
}


