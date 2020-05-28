import { Observable } from 'rxjs';
import { DienstService } from './../../../services/dienst.service';
import { Dienst } from './../../../models/Dienst';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-geplante-dienste',
  templateUrl: './geplante-dienste.component.html',
  styleUrls: ['./geplante-dienste.component.css']
})
export class GeplanteDiensteComponent implements OnInit {

  constructor(private dienstService: DienstService) { }

  geplanteDienste: Observable<Dienst[]>;

  ngOnInit(): void {
    this.geplanteDienste = this.dienstService.getGeplanteDienste();

    this.geplanteDienste.subscribe(data => {
      console.log(data);});
      console.log(this.geplanteDienste);
  }

}
