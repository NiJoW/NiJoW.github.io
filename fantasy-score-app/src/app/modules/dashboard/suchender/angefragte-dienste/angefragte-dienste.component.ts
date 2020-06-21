import { Dienst } from '../../../../models/Dienst';
import { Observable } from 'rxjs';
import { DienstService } from '../../../../services/dienst.service';
import { Component, OnInit } from '@angular/core';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-angefragte-dienste',
  templateUrl: './angefragte-dienste.component.html',
  styleUrls: ['./angefragte-dienste.component.css']
})
export class AngefragteDiensteComponent implements OnInit {

  angefragteDienste: Observable<Dienst[]>;
  id: number;
  moreIcon = faAngleDown;
  isEmpty = false;

  constructor(private dienstService: DienstService) { }

  ngOnInit(): void {
    this.getAngefragteDienste();
    }

    getAngefragteDienste() {
      this.angefragteDienste = this.dienstService.getAngefragteDienste();
    this.angefragteDienste.subscribe(data => {
      console.dir(data);
      if(data.length === 0) {
        this.isEmpty = true;
        return;
      }
      console.log(data);});
      console.log(this.angefragteDienste);
    }
    
    changeFormat(id: number): void {
      console.log(id);
      if(id == this.id) {
        this.id = -1;
      } else {
        this.id = id;
      }
    }
    
}