import { Observable } from 'rxjs';
import { DienstService } from '../../../../services/dienst.service';
import { Dienst } from '../../../../models/Dienst';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-erledigte-dienste',
  templateUrl: './erledigte-dienste.component.html',
  styleUrls: ['./erledigte-dienste.component.css']
})
export class ErledigteDiensteComponent implements OnInit {

  constructor(private dienstService: DienstService) { }

  erledigteDienste: Observable<Dienst[]>;
  longFormat: boolean;

  ngOnInit(): void {
    this.erledigteDienste = this.dienstService.getErledigteDienste();

    this.erledigteDienste.subscribe(data => {
      console.log(data);});
      console.log(this.erledigteDienste);
      this.longFormat = false;
    }
  
    changeFormat(): void {
      this.longFormat = !this.longFormat;
    }
  
    isLongFormat(): boolean {
      return this.longFormat;
    }
}
