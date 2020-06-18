import { Observable } from 'rxjs';
import { DienstService } from '../../../../services/dienst.service';
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

  ngOnInit(): void {
    this.geplanteDienste = this.dienstService.getGeplanteDienste();

    this.geplanteDienste.subscribe(data => {
      console.log(data);});
      console.log(this.geplanteDienste);
      this.longFormat = false;
    }
  
    changeFormat(): void {
      this.longFormat = !this.longFormat;
      if(this.longFormat) {
        this.moreIcon = faAngleUp;
      } else {
        this.moreIcon = faAngleDown;
      }
    }
  
    isLongFormat(): boolean {
      return this.longFormat;
    }
}
