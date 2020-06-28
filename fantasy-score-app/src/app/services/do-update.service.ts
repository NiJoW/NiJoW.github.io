import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DoUpdateService {

  private doUpdateSource = new BehaviorSubject(false);
  currentDoUpdateState = this.doUpdateSource.asObservable();

  private doUpdateSource_AnzahlBenachrichtigungen = new BehaviorSubject(false);
  currentDoUpdateState_AnzahlBenachrichtigungen = this.doUpdateSource_AnzahlBenachrichtigungen.asObservable();

  private doUpdateSource_Anzeige_BonusBenachrichtigungen = new BehaviorSubject(false);
  currentDoUpdateState_Anzeige_BonusBenachrichtigungen = this.doUpdateSource_Anzeige_BonusBenachrichtigungen.asObservable();

  private doUpdateSource_Anzeige_DienstanfrageBenachrichtigungen = new BehaviorSubject(false);
  currentDoUpdateState_Anzeige_DienstanfrageBenachrichtigungen = this.doUpdateSource_Anzeige_DienstanfrageBenachrichtigungen.asObservable();

  private doUpdateSource_Anzeige_AntwortDienstanfrage = new BehaviorSubject(false);
  currentDoUpdateState_Anzeige_AntwortDienstanfrage = this.doUpdateSource_Anzeige_AntwortDienstanfrage.asObservable();



  private doUpdateSource_SocialScore = new BehaviorSubject(false);
  currentDoUpdateState_SocialScore = this.doUpdateSource_SocialScore.asObservable();

  private doUpdateSource_AnzahlErfuellteDienste = new BehaviorSubject(false);
  currentDoUpdateState_AnzahlErfuellteDienste = this.doUpdateSource_AnzahlErfuellteDienste.asObservable();


  private doUpdateSource_AnzahlErstellteTugenden = new BehaviorSubject(false);
  currentDoUpdateState_AnzahlErstellteTugenden = this.doUpdateSource_AnzahlErstellteTugenden.asObservable();

  private doUpdateSource_AnzahlErstellteBonis = new BehaviorSubject(false);
  currentDoUpdateState_AnzahlErstellteBonis = this.doUpdateSource_AnzahlErstellteBonis.asObservable();

  private doViewUpdateSource_AnzahlErhalteneBoni = new BehaviorSubject(false);
  currentDoUpdateState_AnzahlErhaltenBoni = this.doViewUpdateSource_AnzahlErhalteneBoni.asObservable();

  private doUpdateSource_Email = new BehaviorSubject(false);
  currentDoUpdateState_Email = this.doUpdateSource_Email.asObservable();

  private doUpdateSource_Anzeige_DienstSuche = new BehaviorSubject(false);
  currentDoUpdateState_Anzeige_DienstSuche = this.doUpdateSource_Anzeige_DienstSuche.asObservable();



  constructor() { }


  doViewUpdate_AnzahlBenachrichtigungen(doUpdate: boolean) {
    this.doUpdateSource_AnzahlBenachrichtigungen.next(doUpdate)
  }

  doViewUpdate_Anzeige_BonusBenachrichtigungen(doUpdate: boolean) {
    this.doUpdateSource_Anzeige_BonusBenachrichtigungen.next(doUpdate)
  }

  doViewUpdate_Anzeige_DienstanfrageBenachrichtigungen(doUpdate: boolean) {
    this.doUpdateSource_Anzeige_DienstanfrageBenachrichtigungen.next(doUpdate)
  }

  doViewUpdate_Anzeige_AntwortDienstanfrage(doUpdate: boolean) {
    this.doUpdateSource_Anzeige_AntwortDienstanfrage.next(doUpdate)
  }

  doViewUpdate_SocialScore(doUpdate: boolean) {
    this.doUpdateSource_SocialScore.next(doUpdate)
  }

  doViewUpdate_AnzahlErfuellteDienste(doUpdate: boolean) {
    this.doUpdateSource_AnzahlErfuellteDienste.next(doUpdate)
  }

  doViewUpdate_AnzahlErstellteTugenden(doUpdate: boolean) {
    this.doUpdateSource_AnzahlErstellteTugenden.next(doUpdate)
  }

  doViewUpdate_AnzahlErstellteBonis(doUpdate: boolean) {
    this.doUpdateSource_AnzahlErstellteBonis.next(doUpdate)
  }

  doViewUpdate_AnzahlErhalteneBoni(doUpdate: boolean) {
    this.doViewUpdateSource_AnzahlErhalteneBoni.next(doUpdate)
  }

  doViewUpdate_Email(doUpdate: boolean) {
    this.doUpdateSource_Email.next(doUpdate);
  }

  doViewUpdate_Anzeige_DienstSuche(doUpdate: boolean) {
    this.doUpdateSource_Anzeige_DienstSuche.next(doUpdate)
  }


}
