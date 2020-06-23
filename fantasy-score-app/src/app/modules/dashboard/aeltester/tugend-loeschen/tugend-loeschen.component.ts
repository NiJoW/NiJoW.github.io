import { TugendService } from './../../../../services/tugend.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
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

  @Input() message: number;
  done: boolean = false;
  @Output() onDone = new EventEmitter();

  ngOnInit(): void {
  }

  tugendLoeschen(tugendID) {
    console.log("Nutzer will die Tugend " + tugendID + " löschen");
    this.tugendObservable = this.tugendService.archiviereTugend(tugendID);
    this.tugendObservable.subscribe(data => {
    });
   this.onDone.emit(true);
   this.onClose.emit(null); 
  }

  cancel() {
    this.onClose.emit(null); 
  }

}
