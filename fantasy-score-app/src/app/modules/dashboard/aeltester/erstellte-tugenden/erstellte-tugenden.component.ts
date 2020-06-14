import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {TugendService} from "../../../../services/tugend.service";
import {Tugend} from "../../../../models/Tugend";
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-erstellte-tugenden',
  templateUrl: './erstellte-tugenden.component.html',
  styleUrls: ['./erstellte-tugenden.component.css']
})
export class ErstellteTugendenComponent implements OnInit {

  erstellteTugenden: Observable<Tugend[]>;
  editIcon = faPencilAlt;
  createIcon = faPlus;

  zeigeBearbeitenOverlay = false;
  zeigeErstellenOverlay = false;
  choosenTugend: Tugend;
  tugendObservable : Observable<Tugend>;


  constructor(private tugendService: TugendService) { }

  ngOnInit(): void {
    this.getEigeneErstellteTugenden();
  }

  bearbeiten(tugendID) {
    console.log("Nutzer will die Tugend " + tugendID)+ " bearbeiten";
    this.tugendObservable = this.tugendService.getTugendByID(tugendID);
    this.tugendObservable.subscribe(data => {
      this.choosenTugend = data;
      console.dir(this.choosenTugend);
      this.zeigeBearbeitenOverlay = true;
    })
  }

  neueTugendErstellen(){
    this.zeigeErstellenOverlay = true;
  }

  private getEigeneErstellteTugenden() {
    this.erstellteTugenden = this.tugendService.getErstellteTugenden();

    this.erstellteTugenden.subscribe(data => {
      console.log('Tugend aus DB in Componente:');
      console.log(data);
    });
  }

  updateTugendenOnEvent(){
    this.zeigeBearbeitenOverlay = false;
    this.zeigeErstellenOverlay = false;
    this.getEigeneErstellteTugenden();
  }

}
