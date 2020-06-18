import { TugendService } from '../../../../services/tugend.service';
import { Tugend } from '../../../../models/Tugend';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {DoUpdateService} from "../../../../services/do-update.service";

@Component({
  selector: 'app-erfuellte-tugenden',
  templateUrl: './erfuellte-tugenden.component.html',
  styleUrls: ['./erfuellte-tugenden.component.css']
})
export class ErfuellteTugendenComponent implements OnInit {

  constructor(private tugendService: TugendService,
              private data: DoUpdateService
              ) { }

  erfuellteTugenden: Observable<Tugend[]>;

  ngOnInit(): void {
    this.getErfuellteTugenden();
    this.data.currentDoUpdateState.subscribe(message =>
    {this.getErfuellteTugenden(); this.getErfuellteTugenden(); }
    );
  }

  getErfuellteTugenden(){
    this.erfuellteTugenden = this.tugendService.getErfuellteTugenden();

    this.erfuellteTugenden.subscribe(data => {
      console.log(data);});
  }


}
