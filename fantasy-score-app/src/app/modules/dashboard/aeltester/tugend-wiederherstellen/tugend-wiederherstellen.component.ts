import { Tugend } from './../../../../models/Tugend';
import { Observable } from 'rxjs';
import { TugendService } from './../../../../services/tugend.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DoUpdateService } from 'src/app/services/do-update.service';

@Component({
  selector: 'app-tugend-wiederherstellen',
  templateUrl: './tugend-wiederherstellen.component.html',
  styleUrls: ['./tugend-wiederherstellen.component.css']
})
export class TugendWiederherstellenComponent implements OnInit {

  @Output() onClose = new EventEmitter();
  tugendObservable : Observable<Tugend>;

  @Input() message: number;
  done: boolean = false;
  @Output() onDone = new EventEmitter();

  constructor(private tugendService: TugendService,
    private doUpdateService: DoUpdateService) { }

  ngOnInit(): void {
  }

  tugendWiederherstellen(tugendID) {
    console.log("Nutzer will die Tugend " + tugendID + " wiederherstellen");
    this.tugendObservable = this.tugendService.stelleTugendWiederHer(tugendID);
    this.tugendObservable.subscribe(data => {
      this.doUpdateService.doViewUpdate_AnzahlErstellteTugenden(true);
    });
    this.onDone.emit(true);
    this.onClose.emit(null); 
  }

  cancel() {
    this.onClose.emit(null); 
  }


}