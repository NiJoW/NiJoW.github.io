import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BuergerService } from 'src/app/services/buerger.service';
import { AuthService } from 'src/app/services/auth.service';
import { Buerger } from 'src/app/models/Buerger';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tugendhaften-freischalten',
  templateUrl: './tugendhaften-freischalten.component.html',
  styleUrls: ['./tugendhaften-freischalten.component.css']
})
export class TugendhaftenFreischaltenComponent implements OnInit {

  @Output() onClose = new EventEmitter();
  nutzer: Buerger;

  constructor(private buergerService: BuergerService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.nutzer = this.authService.getNutzer();
  }

  tugendhaftenFreischalten() {
    this.buergerService.unlockTugendhafter(this.nutzer.id_buerger).subscribe(data => {
      console.log(data);
    });
    this.buergerService.newSocialScoreAnlegen(this.nutzer.id_buerger).subscribe(data => {
      console.log(data);
    });
    alert("Sie müssen sich erneut einloggen!");
    this.logout();
  }

  cancel() {
    this.onClose.emit(null); 
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
    window.location.reload();

  }

}
