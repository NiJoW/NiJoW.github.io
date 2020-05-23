import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './modules/home/home.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { TugendenComponent } from './modules/tugenden/tugenden.component';
import { DiensteComponent } from './modules/dienste/dienste.component';
import { BonusprogrammeComponent } from './modules/bonusprogramme/bonusprogramme.component';
import { BannerComponent } from './modules/banner/banner.component';
import { BestenlisteComponent } from './modules/bestenliste/bestenliste.component';
import { ErfuellteTugendenComponent } from './modules/dashboard/erfuellte-tugenden/erfuellte-tugenden.component';
import { TodoTugendenComponent } from './modules/dashboard/todo-tugenden/todo-tugenden.component';
import { AuthService } from './services/auth.service';
import { AnmeldenComponent } from './modules/anmelden/anmelden.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    TugendenComponent,
    DiensteComponent,
    BonusprogrammeComponent,
    BannerComponent,
    BestenlisteComponent,
    ErfuellteTugendenComponent,
    TodoTugendenComponent,
    AnmeldenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
