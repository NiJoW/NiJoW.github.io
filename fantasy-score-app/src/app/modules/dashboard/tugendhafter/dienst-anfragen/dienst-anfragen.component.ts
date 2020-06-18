import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Dienst } from 'src/app/models/Dienst';
import { DienstService } from 'src/app/services/dienst.service';

@Component({
  selector: 'app-dienst-anfragen',
  templateUrl: './dienst-anfragen.component.html',
  styleUrls: ['./dienst-anfragen.component.css']
})
export class DienstAnfragenComponent implements OnInit {

  @Input() angefragteDienste: Observable<Dienst[]>;
  
  dienstAngefragt: boolean;
  dienstObservable: Observable<Dienst>;

  constructor(private dienstService: DienstService) { }

  ngOnInit(): void {
    
    if(this.angefragteDienste != undefined) {
      console.dir(this.angefragteDienste);
    }
  }

  antragAnnehmen(dienstID:number) {
    console.log("Dienst: " + dienstID + " annehmen!");
    this.dienstObservable = this.dienstService.bestaetigeVertrag(dienstID, 'bestätigt');
    this.dienstObservable.subscribe(data => {
      console.dir(data);
      window.location.reload(); //TODO: find ich nicht so gut
    })
  }

  antragAblehnen(dienstID:number) {
    console.log("Dienst: " + dienstID + " ablehnen!");
    this.dienstObservable = this.dienstService.bestaetigeVertrag(dienstID, 'abgelehnt');
    this.dienstObservable.subscribe(data => {
      console.dir(data);
      window.location.reload(); //TODO: find ich nicht so gut
    })
  }
}
