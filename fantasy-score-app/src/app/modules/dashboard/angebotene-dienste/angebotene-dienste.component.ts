import { Observable } from 'rxjs';
import { DienstService } from './../../../services/dienst.service';
import { Dienst } from './../../../models/Dienst';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-angebotene-dienste',
  templateUrl: './angebotene-dienste.component.html',
  styleUrls: ['./angebotene-dienste.component.css']
})
export class AngeboteneDiensteComponent implements OnInit {

  constructor(private dienstService: DienstService) { }

  angeboteneDienste: Observable<Dienst[]>;

  ngOnInit(): void {
    this.angeboteneDienste = this.dienstService.getAngeboteneDienste();

    this.angeboteneDienste.subscribe(data => {
      console.log(data);});
      console.log(this.angeboteneDienste);
  }

}
