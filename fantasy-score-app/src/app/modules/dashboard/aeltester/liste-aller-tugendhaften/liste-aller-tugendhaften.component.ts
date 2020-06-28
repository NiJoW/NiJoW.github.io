import { Observable } from 'rxjs';
import { BuergerService } from 'src/app/services/data/buerger.service';
import { Buerger } from './../../../../models/Buerger';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-liste-aller-tugendhaften',
  templateUrl: './liste-aller-tugendhaften.component.html',
  styleUrls: ['./liste-aller-tugendhaften.component.css']
})
export class ListeAllerTugendhaftenComponent implements OnInit {

  buergerListe: Observable<Buerger[]>;

  constructor(private buergerService: BuergerService) { }

  ngOnInit(): void {
    this.buergerListe = this.buergerService.getBuerger();

    this.buergerListe.subscribe(data => {
      console.log(data); });
    console.log(this.buergerListe);
  }

}
