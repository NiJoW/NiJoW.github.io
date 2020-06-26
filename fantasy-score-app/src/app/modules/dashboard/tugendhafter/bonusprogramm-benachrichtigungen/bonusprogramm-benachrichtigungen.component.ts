import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Observable } from 'rxjs';
import {BonusBenachrichtigung} from "../../../../models/BonusBenachrichtigung";
import {BonusService} from "../../../../services/bonus.service";
import {DoUpdateService} from "../../../../services/do-update.service";

@Component({
  selector: 'app-bonusprogramm-benachrichtigungen',
  templateUrl: './bonusprogramm-benachrichtigungen.component.html',
  styleUrls: ['./bonusprogramm-benachrichtigungen.component.css']
})
export class BonusprogrammBenachrichtigungenComponent implements OnInit {


  @Input() bonusBenachrichtigungen:Observable<BonusBenachrichtigung[]>;
  @Output() onCloseEvent = new EventEmitter();

  constructor(private BonusService: BonusService,
              private UpdateService: DoUpdateService) { }

  ngOnInit(): void {
    console.dir(this.bonusBenachrichtigungen);
  }

  close(benachrichtigungs_id): void {
    let benachrichtigung: Observable<BonusBenachrichtigung>;
    console.log("close benachrichtigung");
    benachrichtigung = this.BonusService.setBonusBenachrichtigungBonusGelesen(benachrichtigungs_id);
    benachrichtigung.subscribe(data => {
      console.log(data);
      this.UpdateService.doViewUpdate_AnzahlBenachrichtigungen(true);
    });

    this.onCloseEvent.emit(null);
  }

}
