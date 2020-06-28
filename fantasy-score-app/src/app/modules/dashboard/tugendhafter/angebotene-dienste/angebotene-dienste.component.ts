import { Observable } from 'rxjs';
import { DienstService } from '../../../../services/data/dienst.service';
import { Dienst } from '../../../../models/Dienst';
import { Component, OnInit } from '@angular/core';
import { faAngleUp, faAngleDown, faPencilAlt, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-angebotene-dienste',
  templateUrl: './angebotene-dienste.component.html',
  styleUrls: ['./angebotene-dienste.component.css']
})
export class AngeboteneDiensteComponent implements OnInit {

  erstellteDienste: Observable<Dienst[]>;
  editIcon = faPencilAlt;
  createIcon = faPlus;
  deleteIcon = faTrash;

  zeigeBearbeitenOverlay = false;
  zeigeErstellenOverlay = false;
  chosenDienst: Dienst;
  dienstObservable : Observable<Dienst>;

  willDienstLoeschen = false;

  message: number;

  constructor(private dienstService: DienstService) { }

  angeboteneDienste: Observable<Dienst[]>;
  longFormat: boolean;
  moreIcon = faAngleDown;
  id: number;
  isEmpty: boolean;

  ngOnInit(): void {
    this.getEigeneErstellteDienste();
    this.getAngeboteneDienste();
      console.log(this.angeboteneDienste);
      this.longFormat = false;
  }

  getAngeboteneDienste() {
  this.angeboteneDienste = this.dienstService.getAngeboteneDienste();
    this.angeboteneDienste.subscribe(data => {
      if(data.length==0) {
        this.isEmpty = true;
        return;
      }
      console.log(data);
    });
  }

  changeFormat(id: number): void {
    console.log(id);
    if(id == this.id) {
      this.id = -1;
    } else {
      this.id = id;
    }
  }

  bearbeiten(dienstID) {
    console.log("Nutzer will die Tugend " + dienstID)+ " bearbeiten";
    this.dienstObservable = this.dienstService.getDienstByID(dienstID);
    this.dienstObservable.subscribe(data => {
      this.chosenDienst = data;
      console.dir(this.chosenDienst);
      this.zeigeBearbeitenOverlay = true;
    })
  }


  archivieren(dienstID) {
    this.willDienstLoeschen = true;
    this.message = dienstID;
  }

  recieveDone($event) {
    this.updateDiensteOnEvent();
  }

  neuenDienstErstellen(){
    this.zeigeErstellenOverlay = true;
  }

  private getEigeneErstellteDienste() {
    this.angeboteneDienste = this.dienstService.getAngeboteneDienste();
    this.angeboteneDienste.subscribe(data => {
      console.log('Dienst aus DB in Componente:');
      console.log(data);
    });
  }

  updateDiensteOnEvent(){
    this.zeigeBearbeitenOverlay = false;
    this.zeigeErstellenOverlay = false;
    this.getEigeneErstellteDienste();
  }



}
