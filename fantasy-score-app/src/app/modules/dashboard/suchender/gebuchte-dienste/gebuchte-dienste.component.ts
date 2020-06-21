import { faPencilAlt, faPlus, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import { DienstService } from '../../../../services/dienst.service';
import { Dienst } from '../../../../models/Dienst';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-gebuchte-dienste',
  templateUrl: './gebuchte-dienste.component.html',
  styleUrls: ['./gebuchte-dienste.component.css']
})
export class GebuchteDiensteComponent implements OnInit {

  editIcon = faPencilAlt;
  createIcon = faPlus;
  moreIcon = faAngleDown;
  id: number;
  isEmpty: boolean;

  constructor(private dienstService: DienstService) { }

  gebuchteDienste: Observable<Dienst[]>;

  ngOnInit(): void {
    this.getGebuchteDienste();
    }

    getGebuchteDienste() {
      this.gebuchteDienste = this.dienstService.getGebuchteDienste();
      this.gebuchteDienste.subscribe(data => {
        if(data.length == 0) {
          this.isEmpty = true;
          return;
        }
        console.log(data);});
        console.log(this.gebuchteDienste);
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
