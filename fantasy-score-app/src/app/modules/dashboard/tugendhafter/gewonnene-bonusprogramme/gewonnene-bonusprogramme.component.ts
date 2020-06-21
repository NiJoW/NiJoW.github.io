import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Bonusprogramm } from 'src/app/models/Bonusprogramm';
import { BonusService } from 'src/app/services/bonus.service';

@Component({
  selector: 'app-gewonnene-bonusprogramme',
  templateUrl: './gewonnene-bonusprogramme.component.html',
  styleUrls: ['./gewonnene-bonusprogramme.component.css']
})
export class GewonneneBonusprogrammeComponent implements OnInit {

  bonusprogramme: Observable<Bonusprogramm[]>

  constructor(private bonusService: BonusService) { }

  ngOnInit(): void {
    this.bonusprogramme = this.bonusService.getBonusprogrammeVonNutzer();
    this.bonusprogramme.subscribe(data => {
      console.log(data);
    })
  }
}
