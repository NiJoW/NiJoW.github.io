import { Component, OnInit } from '@angular/core';
import { Kategorie } from 'src/app/models/Kategorie';
import { KategorieService } from '../../kategorie.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tugenden',
  templateUrl: './tugenden.component.html',
  styleUrls: ['./tugenden.component.css']
})
export class TugendenComponent implements OnInit {

  constructor(private kategorieService: KategorieService) { }

  kategorienListe: Observable<Kategorie[]>;

  ngOnInit(): void {
    this.kategorienListe = this.kategorieService.getKategorie();

    this.kategorienListe.subscribe(data => {
      console.log(data);
      console.log(this.kategorienListe);
    }); 
  }
}


