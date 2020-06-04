import { Dienst } from './../../../models/Dienst';
import { Observable } from 'rxjs';
import { DienstService } from './../../../services/dienst.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-angefragte-dienste',
  templateUrl: './angefragte-dienste.component.html',
  styleUrls: ['./angefragte-dienste.component.css']
})
export class AngefragteDiensteComponent implements OnInit {

  constructor(private dienstService: DienstService) { }

  angefragteDienste: Observable<Dienst[]>;

  ngOnInit(): void {
    this.angefragteDienste = this.dienstService.getAngefragteDienste();

    this.angefragteDienste.subscribe(data => {
      console.log(data);});
      console.log(this.angefragteDienste);
  }

}
