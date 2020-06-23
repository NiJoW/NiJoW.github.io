import { Dienst } from 'src/app/models/Dienst';
import { Observable } from 'rxjs';
import { DienstService } from './../../../../services/dienst.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-dienst-loeschen',
  templateUrl: './dienst-loeschen.component.html',
  styleUrls: ['./dienst-loeschen.component.css']
})
export class DienstLoeschenComponent implements OnInit {

  @Output() onClose = new EventEmitter();
  dienstObservable: Observable<Dienst>;

  constructor(private dienstService: DienstService) { }

  ngOnInit(): void {

  }

  dienstLoeschen(/*dienstID*/) {
    var dienstID = 0;
    console.log("Nutzer will die Tugend " + dienstID + " archivieren");
    this.dienstObservable = this.dienstService.archiviereDienst(dienstID);
    this.dienstObservable.subscribe(data => {
    });
    /*this.updateDiensteOnEvent();*/
  }

  cancel() {
    this.onClose.emit(null); 
  }
}