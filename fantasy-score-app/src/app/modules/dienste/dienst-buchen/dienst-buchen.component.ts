import { Component, OnInit, Input } from '@angular/core';
import { Dienst } from 'src/app/models/Dienst';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dienst-buchen',
  templateUrl: './dienst-buchen.component.html',
  styleUrls: ['./dienst-buchen.component.css']
})
export class DienstBuchenComponent implements OnInit {

  dienstForm;
  dienst: Dienst;
  fehler = false;

  constructor(private formBuilder: FormBuilder) {
    this.dienstForm = this.formBuilder.group({
      datum: ''
    }); 
  }

  @Input() choosenDienst: Dienst;

  ngOnInit(): void {

  }

  buchen(datum: Date) {

  }

}
