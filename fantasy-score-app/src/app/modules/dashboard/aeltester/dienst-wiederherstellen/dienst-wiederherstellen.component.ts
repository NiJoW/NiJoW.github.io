import { DienstService } from '../../../../services/data/dienst.service';
import { Observable } from 'rxjs';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Dienst } from 'src/app/models/Dienst';

@Component({
  selector: 'app-dienst-wiederherstellen',
  templateUrl: './dienst-wiederherstellen.component.html',
  styleUrls: ['./dienst-wiederherstellen.component.css']
})
export class DienstWiederherstellenComponent implements OnInit {

  @Output() onClose = new EventEmitter();
  dienstObservable: Observable<Dienst>;

  @Input() message: number;
  done: boolean = false;
  @Output() onDone = new EventEmitter();

  constructor(private dienstService: DienstService) { }

  ngOnInit(): void {
  }

  tugendhaftenFreischalten(dienstID) {
    console.log("Nutzer will die Dienst " + dienstID + " wiederherstellen");
    this.dienstObservable = this.dienstService.stelleDienstWiederHer(dienstID);
    this.dienstObservable.subscribe(data => {
    });
    this.onDone.emit(true);
    this.onClose.emit(null); 
  }

  cancel() {
    this.onClose.emit(null); 
  }

}
