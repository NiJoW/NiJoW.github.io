import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Bonusprogramm } from 'src/app/models/Bonusprogramm';

@Component({
  selector: 'app-bonusprogramm-benachrichtigungen',
  templateUrl: './bonusprogramm-benachrichtigungen.component.html',
  styleUrls: ['./bonusprogramm-benachrichtigungen.component.css']
})
export class BonusprogrammBenachrichtigungenComponent implements OnInit {


  @Input() bonusProgramme:Observable<Bonusprogramm>;

  constructor() { }

  ngOnInit(): void {
    console.dir(this.bonusProgramme);
  }

  close(): void {
    console.log("close message");
  }

}
