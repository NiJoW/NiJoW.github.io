import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Bonusprogramm } from 'src/app/models/Bonusprogramm';
import { BonusService } from 'src/app/services/bonus.service';
import {BonusBenachrichtigung} from "../../../../models/BonusBenachrichtigung";

@Component({
  selector: 'app-gewonnene-bonusprogramme',
  templateUrl: './gewonnene-bonusprogramme.component.html',
  styleUrls: ['./gewonnene-bonusprogramme.component.css']
})
export class GewonneneBonusprogrammeComponent implements OnInit {

  bonusBenachrichtigung: Observable<BonusBenachrichtigung[]>;

  constructor(private bonusService: BonusService) { }

  ngOnInit(): void {
    this.bonusBenachrichtigung = this.bonusService.getBonusBenachrichtigungAlleFuerNutzer();
    this.bonusBenachrichtigung.subscribe(data => {
      console.log(data);
    })
  }
}
