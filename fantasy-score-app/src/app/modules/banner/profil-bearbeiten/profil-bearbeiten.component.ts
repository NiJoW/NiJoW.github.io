import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { faEnvelope, faKey, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { Buerger } from 'src/app/models/Buerger';
import { BuergerService } from 'src/app/services/buerger.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profil-bearbeiten',
  templateUrl: './profil-bearbeiten.component.html',
  styleUrls: ['./profil-bearbeiten.component.css']
})
export class ProfilBearbeitenComponent implements OnInit {

  @Output() onClose = new EventEmitter();
  message = "";
  bearbeitungsForm;
  emailIcon = faEnvelope;
  passwordIcon = faKey;
  eyeIcon = faEyeSlash;
  nutzer: Buerger;
  fieldTextType = false;
  buergerObservable: Observable<Buerger>;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private buergerService: BuergerService) { 
    this.nutzer = authService.getNutzer();
    this.bearbeitungsForm = this.formBuilder.group({
      email: this.nutzer.email_adresse,
      passwort: this.nutzer.passwort
    });
  }

  ngOnInit(): void {
  }

  speichern(bearbeitungsDaten) {
    console.dir(bearbeitungsDaten);
    this.buergerObservable = this.buergerService.updateNutzer(bearbeitungsDaten.email, bearbeitungsDaten.passwort, this.nutzer.id_buerger)
    this.buergerObservable.subscribe(data => {
      this.nutzer = data[0];
      this.cancel();
    })
  }

  togglePasswort() {
    this.fieldTextType = !this.fieldTextType;
    if(this.fieldTextType) {
      this.eyeIcon = faEye;
    } else {
      this.eyeIcon = faEyeSlash;
    }
  }

  cancel() {
    console.log("close Modal");
    this.onClose.emit(null); 
  }
}
