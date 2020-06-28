import { BonusService } from '../../../../services/data/bonus.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Bonusprogramm } from 'src/app/models/Bonusprogramm';

@Component({
  selector: 'app-bonusprogramm-wiederherstellen',
  templateUrl: './bonusprogramm-wiederherstellen.component.html',
  styleUrls: ['./bonusprogramm-wiederherstellen.component.css']
})
export class BonusprogrammWiederherstellenComponent implements OnInit {

  @Output() onClose = new EventEmitter();
  bonusprogrammObservable : Observable<Bonusprogramm>;

  @Input() message: number;
  done: boolean = false;
  @Output() onDone = new EventEmitter();
 
  constructor(private bonusprogrammService: BonusService) { }

  ngOnInit(): void {
  }

  bonusprogrammWiederherstellen(bonusprogrammID) {
    console.log("Nutzer will die Bonusprogramm " + bonusprogrammID + " wiederherstellen");
    this.bonusprogrammObservable = this.bonusprogrammService.stelleBonusprogrammWiederHer(bonusprogrammID);
    this.bonusprogrammObservable.subscribe(data => {
    });
    this.onDone.emit(true);
    this.onClose.emit(null); 
  }

  cancel() {
    this.onClose.emit(null); 
  }


}