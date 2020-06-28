import { Component, OnInit } from '@angular/core';
import { Bester } from './../../models/Bester';
import { BuergerService } from '../../services/data/buerger.service';
import { Observable } from 'rxjs';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-bestenliste',
  templateUrl: './bestenliste.component.html',
  styleUrls: ['./bestenliste.component.css']
})
export class BestenlisteComponent implements OnInit {

  constructor(private buergerService: BuergerService) { }

  bestenListe: Observable<Bester[]>;
  trophyIcon = faTrophy;

  ngOnInit(): void {
    this.bestenListe = this.buergerService.getBestenliste();

    this.bestenListe.subscribe(data => {
      console.log(data);});
      console.log(this.bestenListe);
  }

}
