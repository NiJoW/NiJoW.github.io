import { Observable } from 'rxjs';
import { Bonuseintrag } from '../../../../models/Bonuseintrag';
import { BonusService } from '../../../../services/bonus.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-erstellte-bonusprogramme',
  templateUrl: './erstellte-bonusprogramme.component.html',
  styleUrls: ['./erstellte-bonusprogramme.component.css']
})
export class ErstellteBonusprogrammeComponent implements OnInit {

  constructor(private bonusService: BonusService) { }

  erstellteBonusprogramme: Observable<Bonuseintrag[]>;

  ngOnInit(): void {
    this.erstellteBonusprogramme = this.bonusService.getErstellteBonusprogramme();

    this.erstellteBonusprogramme.subscribe(data => {
      console.log(data);});
      console.log(this.erstellteBonusprogramme);
  }


}
