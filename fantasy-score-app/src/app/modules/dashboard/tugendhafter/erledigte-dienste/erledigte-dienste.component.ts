import { Observable } from 'rxjs';
import { DienstService } from '../../../../services/data/dienst.service';
import { Dienst } from '../../../../models/Dienst';
import { Component, OnInit } from '@angular/core';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-erledigte-dienste',
  templateUrl: './erledigte-dienste.component.html',
  styleUrls: ['./erledigte-dienste.component.css']
})
export class ErledigteDiensteComponent implements OnInit {

  constructor(private dienstService: DienstService) { }

  erledigteDienste: Observable<Dienst[]>;
  moreIcon = faAngleDown;
  id: number;
  isEmpty = false;

  ngOnInit(): void {
    this.erledigteDienste = this.dienstService.getErledigteDienste();

    this.erledigteDienste.subscribe(data => {
      if(data.length == 0) {
        this.isEmpty = true;
      }
      console.log(data);});
      console.log(this.erledigteDienste);
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
