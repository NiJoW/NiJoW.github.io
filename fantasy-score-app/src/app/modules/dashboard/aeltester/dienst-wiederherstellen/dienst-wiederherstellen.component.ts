import { DienstService } from './../../../../services/dienst.service';
import { Observable } from 'rxjs';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Dienst } from 'src/app/models/Dienst';

@Component({
  selector: 'app-dienst-wiederherstellen',
  templateUrl: './dienst-wiederherstellen.component.html',
  styleUrls: ['./dienst-wiederherstellen.component.css']
})
export class DienstWiederherstellenComponent implements OnInit {

  @Output() onClose = new EventEmitter();
  dienstObservable: Observable<Dienst>;


  constructor(private dienstService: DienstService) { }

  ngOnInit(): void {
  }

  tugendhaftenFreischalten(/*dienstID*/) {
    var dienstID = 0;
    console.log("Nutzer will die Dienst " + dienstID + " wiederherstellen");
    this.dienstObservable = this.dienstService.stelleDienstWiederHer(dienstID);
    this.dienstObservable.subscribe(data => {
    });
    /*this.updateDiensteOnEvent();*/
  }

  cancel() {
    this.onClose.emit(null); 
  }

}
