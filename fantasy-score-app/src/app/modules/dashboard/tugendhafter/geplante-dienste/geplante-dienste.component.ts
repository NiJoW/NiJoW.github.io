import { Observable } from 'rxjs';
import { DienstService } from '../../../../services/data/dienst.service';
import { Dienst } from '../../../../models/Dienst';
import { Component, OnInit } from '@angular/core';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-geplante-dienste',
  templateUrl: './geplante-dienste.component.html',
  styleUrls: ['./geplante-dienste.component.css']
})
export class GeplanteDiensteComponent implements OnInit {

  constructor(private dienstService: DienstService) { }

  geplanteDienste: Observable<Dienst[]>;
  longFormat: boolean;
  moreIcon = faAngleDown;
  id: number;
  isEmpty = false;

  ngOnInit(): void {
    this.geplanteDienste = this.dienstService.getGeplanteDienste();

    this.geplanteDienste.subscribe(data => {
      if(data.length == 0) {
        this.isEmpty = true;
      }
      console.log(data);});
      console.log(this.geplanteDienste);
      this.longFormat = false;
    }
  
    changeFormat(id: number): void {
      console.log(id);
      if(id == this.id) {
        this.id = -1;
      } else {
        this.id = id;
      }
    }
  
    isLongFormat(): boolean {
      return this.longFormat;
    }
}
