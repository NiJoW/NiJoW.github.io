import { DienstService } from 'src/app/services/dienst.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Dienst } from 'src/app/models/Dienst';
import { faPencilAlt, faPlus, faAngleDown, faTrashRestore } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-archivierte-dienste',
  templateUrl: './archivierte-dienste.component.html',
  styleUrls: ['./archivierte-dienste.component.css']
})
export class ArchivierteDiensteComponent implements OnInit {

  archivierteDienste: Observable<Dienst[]>;
  editIcon = faPencilAlt;
  createIcon = faPlus;
  moreIcon = faAngleDown;
  id: number;
  isEmpty = false;
  restoreIcon = faTrashRestore;


  zeigeBearbeitenOverlay = false;
  zeigeErstellenOverlay = false;
  chosenDienst: Dienst;
  dienstObservable : Observable<Dienst>;

  willDienstWiederherstellen = false;
  message: number;


  constructor(private dienstService: DienstService) { }

  ngOnInit(): void {
    this.getArchivierteDienste();
  }

  wiederherstellen(dienstID) {
    this.willDienstWiederherstellen = true;
    this.message = dienstID;
  }

  recieveDone($event) {
    this.updateDiensteOnEvent();
  }

  neueDienstErstellen(){
    this.zeigeErstellenOverlay = true;
  }

  private getArchivierteDienste() {
    this.archivierteDienste = this.dienstService.getArchivierteDienste();

    this.archivierteDienste.subscribe(data => {
      console.log('Dienst aus DB in Componente:');
      console.log(data);
    });
  }

  updateDiensteOnEvent(){
    this.zeigeBearbeitenOverlay = false;
    this.zeigeErstellenOverlay = false;
    this.getArchivierteDienste();
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