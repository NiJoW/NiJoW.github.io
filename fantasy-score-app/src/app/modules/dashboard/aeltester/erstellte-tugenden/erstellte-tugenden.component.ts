import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {TugendService} from "../../../../services/tugend.service";
import {Tugend} from "../../../../models/Tugend";
import { faPencilAlt, faTrash, faAngleDown } from '@fortawesome/free-solid-svg-icons';
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
  deleteIcon = faTrash;
  moreIcon = faAngleDown;
  id: number;
  isEmpthy = false;


  zeigeBearbeitenOverlay = false;
  zeigeErstellenOverlay = false;
  chosenTugend: Tugend;
  tugendObservable : Observable<Tugend>;


  constructor(private tugendService: TugendService) { }

  ngOnInit(): void {
    this.getEigeneErstellteTugenden();
  }

  bearbeiten(tugendID) {
    console.log("Nutzer will die Tugend " + tugendID)+ " bearbeiten";
    this.tugendObservable = this.tugendService.getTugendByID(tugendID);
    this.tugendObservable.subscribe(data => {
      if(data == null) {
        this.isEmpthy = true;
        return;
      }
      this.chosenTugend = data;
      console.dir(this.chosenTugend);
      this.zeigeBearbeitenOverlay = true;
    });
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

  changeFormat(id) {
    console.log(id);
    if(id == this.id) {
      this.id = -1;
    } else {
      this.id = id;
    }
  }

}
