import { Buerger } from './../../models/Buerger';
import { BuergerService } from './../../services/buerger.service';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  constructor(private buergerService: BuergerService, 
    private authService: AuthService) { }

  nutzer:Buerger;
  trophyIcon = faTrophy;

  ngOnInit(): void {
    this.nutzer = this.authService.getNutzer();
    /* if(this.nutzer.typ == "Tugendhafter") {
      this.buergerService.getSocialScoreFromId(this.nutzer.id_buerger);
    } */
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }


}




