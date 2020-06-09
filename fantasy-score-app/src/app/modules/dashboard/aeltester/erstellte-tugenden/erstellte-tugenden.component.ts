import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {TugendService} from "../../../../services/tugend.service";
import {Tugend} from "../../../../models/Tugend";


@Component({
  selector: 'app-erstellte-tugenden',
  templateUrl: './erstellte-tugenden.component.html',
  styleUrls: ['./erstellte-tugenden.component.css']
})
export class ErstellteTugendenComponent implements OnInit {

  constructor(private tugendService: TugendService) { }

  erstellteTugenden: Observable<Tugend[]>;

  ngOnInit(): void {
    this.erstellteTugenden = this.tugendService.getErstellteTugenden();

    this.erstellteTugenden.subscribe(data => {
      console.log('Tugend aus DB in Componente:');
      console.log(data);
    });
    // für's Bearbeiten nutzen:
    // tugend.kategorieID
    // id_tugend
    console.log(this.erstellteTugenden);
  }

}
