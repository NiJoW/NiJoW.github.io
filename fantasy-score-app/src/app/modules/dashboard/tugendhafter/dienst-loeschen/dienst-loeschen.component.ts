import { Dienst } from 'src/app/models/Dienst';
import { Observable } from 'rxjs';
import { DienstService } from '../../../../services/data/dienst.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';


@Component({
  selector: 'app-dienst-loeschen',
  templateUrl: './dienst-loeschen.component.html',
  styleUrls: ['./dienst-loeschen.component.css']
})
export class DienstLoeschenComponent implements OnInit {

  @Output() onClose = new EventEmitter();
  dienstObservable: Observable<Dienst>;
  
  @Input() message: number;
  done: boolean = false;
  @Output() onDone = new EventEmitter();
  

  constructor(private dienstService: DienstService) { }

  ngOnInit(): void {

  }

  dienstLoeschen(dienstID) {
    console.log("Nutzer will die Tugend " + dienstID + " archivieren");
    this.dienstObservable = this.dienstService.archiviereDienst(dienstID);
    this.dienstObservable.subscribe(data => {
    });
    this.onDone.emit(true);
    this.onClose.emit(null); 
  }

  cancel() {
    this.onClose.emit(null); 
  }
}