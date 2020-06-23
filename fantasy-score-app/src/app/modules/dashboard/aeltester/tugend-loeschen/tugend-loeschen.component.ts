import { TugendService } from './../../../../services/tugend.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Tugend } from 'src/app/models/Tugend';

@Component({
  selector: 'app-tugend-loeschen',
  templateUrl: './tugend-loeschen.component.html',
  styleUrls: ['./tugend-loeschen.component.css']
})
export class TugendLoeschenComponent implements OnInit {

  @Output() onClose = new EventEmitter();
  tugendObservable : Observable<Tugend>;

  constructor(private tugendService: TugendService) { }

  ngOnInit(): void {
  }

  tugendLoeschen(/*tugendID*/) {
    var tugendID = 0;
    console.log("Nutzer will die Tugend " + tugendID + " löschen");
    this.tugendObservable = this.tugendService.archiviereTugend(tugendID);
    this.tugendObservable.subscribe(data => {
    });
    /*
    this.erstellteTugendenComponent.updateTugendenOnEvent();
    */
  }

  cancel() {
    this.onClose.emit(null); 
  }

}
