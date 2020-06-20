import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// utilities
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OverlayModule } from '@angular/cdk/overlay';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// our own components
import { HomeComponent } from './modules/home/home.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { TugendenComponent } from './modules/tugenden/tugenden.component';
import { DiensteComponent } from './modules/dienste/dienste.component';
import { BonusprogrammeComponent } from './modules/bonusprogramme/bonusprogramme.component';
import { BannerComponent } from './modules/banner/banner.component';
import { BestenlisteComponent } from './modules/bestenliste/bestenliste.component';
import { ErfuellteTugendenComponent } from './modules/dashboard/tugendhafter/erfuellte-tugenden/erfuellte-tugenden.component';
import { TodoTugendenTaetigkeitenComponent } from './modules/dashboard/tugendhafter/todo-tugenden-taetigkeiten/todo-tugenden-taetigkeiten.component';
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
import { ErstellteTugendenComponent } from './modules/dashboard/aeltester/erstellte-tugenden/erstellte-tugenden.component';
import { DienstBuchenComponent } from './modules/dienste/dienst-buchen/dienst-buchen.component';
import { NotificationComponent } from './modules/notification/notification.component';
import { MessageService } from './services/message.service';
import {BearbeiteTugendComponent} from "./modules/dashboard/aeltester/erstellte-tugenden/bearbeite-tugend/bearbeite-tugend.component";
import { DienstAnfragenComponent } from './modules/dashboard/tugendhafter/dienst-anfragen/dienst-anfragen.component';
import { ListeAllerTugendhaftenComponent } from './modules/dashboard/aeltester/liste-aller-tugendhaften/liste-aller-tugendhaften.component';
import {DoUpdateService} from "./services/do-update.service";
import { BonusprogrammBenachrichtigungenComponent } from './modules/dashboard/tugendhafter/bonusprogramm-benachrichtigungen/bonusprogramm-benachrichtigungen.component';
import { BearbeiteDienstComponent } from './modules/dashboard/tugendhafter/angebotene-dienste/bearbeite-dienst/bearbeite-dienst.component';
import { ErstelleDienstComponent } from './modules/dashboard/tugendhafter/erstelle-dienst/erstelle-dienst.component';
import { BearbeiteBonusprogrammComponent } from './modules/dashboard/aeltester/erstellte-bonusprogramme/bearbeite-bonusprogramm/bearbeite-bonusprogramm.component';
import { ErstelleBonusprogrammComponent } from './modules/dashboard/aeltester/erstelle-bonusprogramm/erstelle-bonusprogramm.component';
import {WebsocketService} from "./services/websocket.service";
import {CommunicationService} from "./services/communication.service";

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
    TodoTugendenTaetigkeitenComponent,
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
    ErstellteTugendenComponent,
    NotificationComponent,
    BearbeiteTugendComponent,
    BearbeiteTugendComponent,
    DienstAnfragenComponent,
    ListeAllerTugendhaftenComponent,
    BonusprogrammBenachrichtigungenComponent,
    BearbeiteDienstComponent,
    ErstelleDienstComponent,
    BearbeiteBonusprogrammComponent,
    ErstelleBonusprogrammComponent
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
  providers: [
    AuthService,
    MessageService,
    DoUpdateService,
    CommunicationService,
    WebsocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
