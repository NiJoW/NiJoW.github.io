import { Component, OnInit } from '@angular/core';
import {KategorieService} from '../../services/kategorie.service';
import {Kategorie} from '../../models/Kategorie';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  kategorien: Observable<Kategorie[]>;

  constructor(private kategorienService: KategorieService) { }

  ngOnInit(): void {
    this.kategorien = this.kategorienService.getKategorien();

    this.kategorien.subscribe(data => {
      console.log(data); });
    console.log('Test, this.kategorien: ');
    console.log(this.kategorien);
  }

}

