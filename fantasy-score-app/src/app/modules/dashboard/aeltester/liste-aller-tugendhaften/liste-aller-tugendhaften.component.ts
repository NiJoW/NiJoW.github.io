import { Observable, interval } from 'rxjs';
import { BuergerService } from 'src/app/services/buerger.service';
import { Buerger } from './../../../../models/Buerger';
import { Component, OnInit } from '@angular/core';
import { startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-liste-aller-tugendhaften',
  templateUrl: './liste-aller-tugendhaften.component.html',
  styleUrls: ['./liste-aller-tugendhaften.component.css']
})
export class ListeAllerTugendhaftenComponent implements OnInit {

  buergerListe: Observable<Buerger[]>;

  constructor(private buergerService: BuergerService) { }

  ngOnInit(): void {
    this.getListeAllerTugendhaften();
    /*this.buergerListe = this.buergerService.getBuerger();

    this.buergerListe.subscribe(data => {
      console.log(data); });
    console.log(this.buergerListe);*/
  }

  private getListeAllerTugendhaften() {
    interval(30000)
      .pipe(
        startWith(0),
        switchMap(() => this.buergerListe = this.buergerService.getBuerger())
      )
      .subscribe(data => {});
  }

}
