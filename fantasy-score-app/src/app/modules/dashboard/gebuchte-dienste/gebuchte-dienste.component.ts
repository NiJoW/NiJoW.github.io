import { Component, OnInit } from '@angular/core';
import { DienstService } from './../../../services/dienst.service';
import { Dienst } from './../../../models/Dienst';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-gebuchte-dienste',
  templateUrl: './gebuchte-dienste.component.html',
  styleUrls: ['./gebuchte-dienste.component.css']
})
export class GebuchteDiensteComponent implements OnInit {

  constructor(private dienstService: DienstService) { }

  gebuchteDienste: Observable<Dienst[]>;

  ngOnInit(): void {
    this.gebuchteDienste = this.dienstService.getGebuchteDienste();

    this.gebuchteDienste.subscribe(data => {
      console.log(data);});
      console.log(this.gebuchteDienste);
  }

}
