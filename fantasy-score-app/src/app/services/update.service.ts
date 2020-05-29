import { AuthService } from 'src/app/services/auth.service';
import { BannerComponent } from './../modules/banner/banner.component';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(private bannerComponent: BannerComponent,
              private authService: AuthService) { }

  updateApp(){ 
    this.bannerComponent.update(this.authService.getBuerger());
  }
}
