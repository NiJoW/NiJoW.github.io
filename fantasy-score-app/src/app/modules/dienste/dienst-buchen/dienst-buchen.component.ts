
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { formatDate } from '@angular/common';
import { Dienst } from 'src/app/models/Dienst';
import { FormBuilder } from '@angular/forms';
import { DienstService} from 'src/app/services/dienst.service';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-dienst-buchen',
  templateUrl: './dienst-buchen.component.html',
  styleUrls: ['./dienst-buchen.component.css']
})
export class DienstBuchenComponent implements OnInit {

  dienstForm;
  dienst: Dienst;
  fehler = false;
  newDienst: Observable<Dienst>;

  

  constructor(private dienstService: DienstService,
    private messageService: MessageService,
    private authService: AuthService,
    private formBuilder: FormBuilder) {
    this.dienstForm = this.formBuilder.group({
      datum: [new Date()]
    }); 
  }

  @Input() choosenDienst: Dienst;

  @Output() onClose = new EventEmitter();

  ngOnInit(): void {
    console.log(this.choosenDienst);
    this.dienst = this.choosenDienst[0];
  }

  buchen() {
    
    console.log(this.dienstForm.value.datum);
    
    /*console.log(datum+"");
    console.log(datum.toString);
    console.log(datum.toDateString);*/

    if(this.dienstForm.value.datum == null) { //TODO funktioniert nicht + nur dates nach heute akzeptieren
      this.fehler = true;
      console.log("show Fehler");
    } else {
      this.newDienst = this.dienstService.createDiensvertrag(this.choosenDienst[0].id_dienstangebot, this.dienstForm.value.datum);
      this.onClose.emit(null); 
      this.messageService.setMessage("Der Dienst wurde deinem Dashboard hinzugefügt.");
      /*this.newDienst.subscribe(data => {
        console.dir(data);
      });*/
  
    }
  }

  cancel() {
    console.log("close Modal");
    this.onClose.emit(null); 
  }

}
