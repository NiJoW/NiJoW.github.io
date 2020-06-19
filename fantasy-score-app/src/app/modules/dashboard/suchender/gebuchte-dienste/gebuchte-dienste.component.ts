import { faPencilAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
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

  constructor(private dienstService: DienstService) { }

  gebuchteDienste: Observable<Dienst[]>;
  longFormat: boolean;

  ngOnInit(): void {
    this.gebuchteDienste = this.dienstService.getGebuchteDienste();

    this.gebuchteDienste.subscribe(data => {
      console.log(data);});
      console.log(this.gebuchteDienste);
      this.longFormat = false;
    }
    
    changeFormat(): void {
      this.longFormat = !this.longFormat;
    }
    
    isLongFormat(): boolean {
      return this.longFormat;
    }
}
