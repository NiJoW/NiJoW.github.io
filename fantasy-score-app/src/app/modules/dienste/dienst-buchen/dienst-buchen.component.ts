import { Component, OnInit, Input } from '@angular/core';
import { formatDate } from '@angular/common';
import { Dienst } from 'src/app/models/Dienst';
import { FormBuilder } from '@angular/forms';
import { DienstService} from 'src/app/services/dienst.service';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';

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
    private authService: AuthService,
    private formBuilder: FormBuilder) {
    this.dienstForm = this.formBuilder.group({
      datum: [new Date()]
    }); 
  }

  @Input() choosenDienst: Dienst;

  ngOnInit(): void {
    console.log(this.choosenDienst);
    this.dienst = this.choosenDienst[0];
  }

  buchen(datum: string) {
    
    console.log(datum);
    if(datum == null) { //TODO funktioniert nicht + nur dates nach heute akzeptieren
      this.fehler = true;
      console.log("show Fehler");
    } else {
      console.log(datum);
    /*this.newDienst = this.dienstService.createDiensvertrag(this.choosenDienst[0].id_dienstangebot, datum+"");
      this.newDienst.subscribe(data => {
        console.log(data);
      });*/
  
    }
  }

}
