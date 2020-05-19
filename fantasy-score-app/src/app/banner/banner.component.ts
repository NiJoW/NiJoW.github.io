import { BuergerService } from './../buerger.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  titel;
  bueger : [];
  
  constructor(private buergerService: BuergerService) { 
   // buergerService.getBueger();
  }

  ngOnInit(): void {
    this.getBueger();
  }

  getBueger(): void {
    this.buergerService.getBuerger()
    .subscribe(bueger => this.titel = bueger);
  }

}




