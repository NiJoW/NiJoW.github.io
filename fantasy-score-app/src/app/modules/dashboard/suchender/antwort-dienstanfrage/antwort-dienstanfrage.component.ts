import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Observable } from 'rxjs';
import { Dienst } from 'src/app/models/Dienst';
import { DienstService } from 'src/app/services/data/dienst.service';
import {DoUpdateService} from "../../../../services/utility/do-update.service";

@Component({
  selector: 'app-antwort-dienstanfrage',
  templateUrl: './antwort-dienstanfrage.component.html',
  styleUrls: ['./antwort-dienstanfrage.component.css']
})
export class AntwortDienstanfrageComponent implements OnInit {
  @Input() antwortenAufDienstanfragen: Observable<Dienst[]>;
  @Output() onCloseEvent = new EventEmitter();


  constructor(private dienstService: DienstService,
              private updateService: DoUpdateService) { }

  ngOnInit(): void {
  }

  setGelesen(dienstID:number){
    let dienstObservable = this.dienstService.vertragSetAntwortGelesen(dienstID);
    dienstObservable.subscribe(data => {
      console.dir(data);
      this.updateService.doViewUpdate_AnzahlBenachrichtigungen(true);
      this.onCloseEvent.emit(null);
    })

  }

}
