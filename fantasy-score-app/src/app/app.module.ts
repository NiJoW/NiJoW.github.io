import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {OverlayComponent} from './modules/overlay/overlayComponent/overlay.component';
import {SubscribeComponent} from './modules/overlay/subscribe/subscribe.component';
import { OverlayModule } from '@angular/cdk/overlay';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './modules/home/home.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { TugendenComponent } from './modules/tugenden/tugenden.component';
import { DiensteComponent } from './modules/dienste/dienste.component';
import { BonusprogrammeComponent } from './modules/bonusprogramme/bonusprogramme.component';
import { BannerComponent } from './modules/banner/banner.component';
import { BestenlisteComponent } from './modules/bestenliste/bestenliste.component';
import { ErfuellteTugendenComponent } from './modules/dashboard/erfuellte-tugenden/erfuellte-tugenden.component';
import { TodoTugendenComponent } from './modules/dashboard/todo-tugenden/todo-tugenden.component';
import { ErstelleTugendComponent } from './modules/dashboard/erstelle-tugend/erstelle-tugend.component';
import { AuthService } from './services/auth.service';
import { AnmeldenComponent } from './modules/anmelden/anmelden.component';
import { RegistrierenComponent } from './modules/registrieren/registrieren.component';
import { AngeboteneDiensteComponent } from './modules/dashboard/angebotene-dienste/angebotene-dienste.component';
import { GeplanteDiensteComponent } from './modules/dashboard/geplante-dienste/geplante-dienste.component';
import { ErledigteDiensteComponent } from './modules/dashboard/erledigte-dienste/erledigte-dienste.component';
import { GebuchteDiensteComponent } from './modules/dashboard/gebuchte-dienste/gebuchte-dienste.component';
import { AngefragteDiensteComponent } from './modules/dashboard/angefragte-dienste/angefragte-dienste.component';
import { ErstelleTugendOverlayComponent } from './modules/dashboard/erstelle-tugend/erstelle-tugend-overlay/erstelle-tugend-overlay.component';

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
    ErstelleTugendComponent,
    AnmeldenComponent,
    RegistrierenComponent,
    AngeboteneDiensteComponent,
    GeplanteDiensteComponent,
    ErledigteDiensteComponent,
    GebuchteDiensteComponent,
    AngefragteDiensteComponent,
    ErfuellteTugendenComponent,
    ErstelleTugendComponent,
    OverlayComponent,
    SubscribeComponent,
    ErstelleTugendOverlayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OverlayModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
