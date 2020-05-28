import { TugendService } from './../../../services/tugend.service';
import { Tugend } from './../../../models/Tugend';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-erfuellte-tugenden',
  templateUrl: './erfuellte-tugenden.component.html',
  styleUrls: ['./erfuellte-tugenden.component.css']
})
export class ErfuellteTugendenComponent implements OnInit {

  constructor(private tugendService: TugendService) { }

  erfuellteTugenden: Observable<Tugend[]>;

  ngOnInit(): void {
    this.erfuellteTugenden = this.tugendService.getErfuellteTugenden();

    this.erfuellteTugenden.subscribe(data => {
      console.log(data);});
      console.log(this.erfuellteTugenden);
  }

}
