import { BonusService } from '../../../../services/data/bonus.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Bonusprogramm } from 'src/app/models/Bonusprogramm';

@Component({
  selector: 'app-bonusprogramm-loeschen',
  templateUrl: './bonusprogramm-loeschen.component.html',
  styleUrls: ['./bonusprogramm-loeschen.component.css']
})
export class BonusprogrammLoeschenComponent implements OnInit {

  @Output() onClose = new EventEmitter();
  bonusprogrammObservable : Observable<Bonusprogramm>;

  constructor(private bonusprogrammService: BonusService) { }

  @Input() message: number;
  done: boolean = false;
  @Output() onDone = new EventEmitter();

  ngOnInit(): void {
  }

  bonusprogrammLoeschen(bonusprogrammID) {
    console.log("Nutzer will die Bonusprogramm " + bonusprogrammID + " löschen");
    this.bonusprogrammObservable = this.bonusprogrammService.archiviereBonusprogramm(bonusprogrammID);
    this.bonusprogrammObservable.subscribe(data => {
    });
   this.onDone.emit(true);
   this.onClose.emit(null); 
  }

  cancel() {
    this.onClose.emit(null); 
  }

}
