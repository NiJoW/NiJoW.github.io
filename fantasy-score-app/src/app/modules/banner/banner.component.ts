import { Buerger } from './../../models/Buerger';
import { BuergerService } from '../../buerger.service';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  
  
  constructor(private buergerService: BuergerService) { }

  buergerListe: Observable<Buerger[]>;

  ngOnInit(): void {
    this.buergerListe = this.buergerService.getBuerger();

    this.buergerListe.subscribe(data => {
      console.log(data);});
      console.log("Test, this.bL");
      console.log(this.buergerListe);
  }

  movies = [
    { name: "Episode 1", date: "25.04.2020",
    time: "9:00 Uhr" },
    { name: "Episode 2", date: "25.04.2020",
    time: "12:00 Uhr"},
    { name: "Episode 3", date: "25.04.2020",
    time: "15:00 Uhr" } ];

  

}




