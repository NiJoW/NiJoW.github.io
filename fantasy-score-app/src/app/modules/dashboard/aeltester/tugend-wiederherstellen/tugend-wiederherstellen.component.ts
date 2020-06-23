import { Tugend } from './../../../../models/Tugend';
import { Observable } from 'rxjs';
import { TugendService } from './../../../../services/tugend.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tugend-wiederherstellen',
  templateUrl: './tugend-wiederherstellen.component.html',
  styleUrls: ['./tugend-wiederherstellen.component.css']
})
export class TugendWiederherstellenComponent implements OnInit {

  @Output() onClose = new EventEmitter();
  tugendObservable : Observable<Tugend>;

  constructor(private tugendService: TugendService) { }

  ngOnInit(): void {
  }

  tugendWiederherstellen(/*tugendID*/) {
    var tugendID = 0;
    console.log("Nutzer will die Tugend " + tugendID + " wiederherstellen");
    this.tugendObservable = this.tugendService.stelleTugendWiederHer(tugendID);
    this.tugendObservable.subscribe(data => {
    });
    /*
    this.updateTugendenOnEvent();
    */
  }

  cancel() {
    this.onClose.emit(null); 
  }


}