import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Dienst } from 'src/app/models/Dienst';

@Component({
  selector: 'app-dienst-anfragen',
  templateUrl: './dienst-anfragen.component.html',
  styleUrls: ['./dienst-anfragen.component.css']
})
export class DienstAnfragenComponent implements OnInit {

  @Input() angefragteDienste: Observable<Dienst[]>;
  
  dienstAngefragt: boolean;
  dienst: Dienst;

  constructor() { }

  ngOnInit(): void {
    
    if(this.angefragteDienste != undefined) {
      console.dir(this.angefragteDienste);
      this.dienst = this.angefragteDienste[0];
      console.dir(this.dienst);
    }
  }

}
