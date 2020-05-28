import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BuergerTyp } from './../../models/BuergerTyp.enum';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-anmelden',
  templateUrl: './anmelden.component.html',
  styleUrls: ['./anmelden.component.css']
})
export class AnmeldenComponent implements OnInit {
  
  Typ = BuergerTyp;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  login(role: BuergerTyp) {
    this.authService.login(role);
    this.router.navigate(['/']);
  }
}


