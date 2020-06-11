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
import { ErfuellteTugendenComponent } from './modules/dashboard/tugendhafter/erfuellte-tugenden/erfuellte-tugenden.component';
import { TodoTugendenComponent } from './modules/dashboard/tugendhafter/todo-tugenden/todo-tugenden.component';
import { ErstelleTugendComponent } from './modules/dashboard/aeltester/erstelle-tugend/erstelle-tugend.component';
import { AuthService } from './services/auth.service';
import { AnmeldenComponent } from './modules/anmelden/anmelden.component';
import { RegistrierenComponent } from './modules/registrieren/registrieren.component';
import { AngeboteneDiensteComponent } from './modules/dashboard/tugendhafter/angebotene-dienste/angebotene-dienste.component';
import { GeplanteDiensteComponent } from './modules/dashboard/tugendhafter/geplante-dienste/geplante-dienste.component';
import { ErledigteDiensteComponent } from './modules/dashboard/tugendhafter/erledigte-dienste/erledigte-dienste.component';
import { GebuchteDiensteComponent } from './modules/dashboard/suchender/gebuchte-dienste/gebuchte-dienste.component';
import { AngefragteDiensteComponent } from './modules/dashboard/suchender/angefragte-dienste/angefragte-dienste.component';
import { ErstellteBonusprogrammeComponent } from './modules/dashboard/aeltester/erstellte-bonusprogramme/erstellte-bonusprogramme.component';
import { ErstelleTugendOverlayComponent } from './modules/dashboard/aeltester/erstelle-tugend/erstelle-tugend-overlay/erstelle-tugend-overlay.component';
import { ErstellteTugendenComponent } from './modules/dashboard/aeltester/erstellte-tugenden/erstellte-tugenden.component';
import { DienstBuchenComponent } from './modules/dienste/dienst-buchen/dienst-buchen.component';
import { NotificationComponent } from './modules/notification/notification.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


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
    DienstBuchenComponent,
    ErstellteBonusprogrammeComponent,
    ErfuellteTugendenComponent,
    ErstelleTugendComponent,
    OverlayComponent,
    SubscribeComponent,
    ErstelleTugendOverlayComponent,
    ErstellteTugendenComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OverlayModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
