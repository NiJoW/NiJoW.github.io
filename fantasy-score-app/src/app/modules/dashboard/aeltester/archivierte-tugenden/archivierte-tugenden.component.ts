import { TugendService } from 'src/app/services/tugend.service';
import { Tugend } from 'src/app/models/Tugend';
import { Observable } from 'rxjs';
import { faPencilAlt, faPlus, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-archivierte-tugenden',
  templateUrl: './archivierte-tugenden.component.html',
  styleUrls: ['./archivierte-tugenden.component.css']
})
export class ArchivierteTugendenComponent implements OnInit {

  erstellteTugenden: Observable<Tugend[]>;
  editIcon = faPencilAlt;
  createIcon = faPlus;
  moreIcon = faAngleDown;
  id: number;
  isEmpty = false;


  zeigeBearbeitenOverlay = false;
  zeigeErstellenOverlay = false;
  chosenTugend: Tugend;
  tugendObservable : Observable<Tugend>;

  willTugendWiederherstellen = false;


  constructor(private tugendService: TugendService) { }

  ngOnInit(): void {
    this.getArchivierteTugenden();
  }

  wiederherstellen(tugendID) {
    this.willTugendWiederherstellen = true;
  }

  neueTugendErstellen(){
    this.zeigeErstellenOverlay = true;
  }

  private getArchivierteTugenden() {
    this.erstellteTugenden = this.tugendService.getArchivierteTugenden();

    this.erstellteTugenden.subscribe(data => {
      console.log('Tugend aus DB in Componente:');
      console.log(data);
    });
  }

  updateTugendenOnEvent(){
    this.zeigeBearbeitenOverlay = false;
    this.zeigeErstellenOverlay = false;
    this.getArchivierteTugenden();
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