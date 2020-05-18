import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TugendenComponent } from './tugenden/tugenden.component';
import { DiensteComponent } from './dienste/dienste.component';
import { BonusprogrammeComponent } from './bonusprogramme/bonusprogramme.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    TugendenComponent,
    DiensteComponent,
    BonusprogrammeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
