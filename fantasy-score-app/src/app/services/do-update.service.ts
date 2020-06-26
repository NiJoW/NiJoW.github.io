import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DoUpdateService {

  private doUpdateSource = new BehaviorSubject(false);
  currentDoUpdateState = this.doUpdateSource.asObservable();

  private doUpdateSource_AnzahlBenachrichtigungen = new BehaviorSubject(false);
  currentDoUpdateState_AnzahlBenachrichtigungen = this.doUpdateSource_AnzahlBenachrichtigungen.asObservable();

  private doUpdateSource_SocialScore = new BehaviorSubject(false);
  currentDoUpdateState_SocialScore = this.doUpdateSource_SocialScore.asObservable();
  
  private doUpdateSource_AnzahlErfuellteDienste = new BehaviorSubject(false);
  currentDoUpdateState_AnzahlErfuellteDienste = this.doUpdateSource_AnzahlErfuellteDienste.asObservable();

  constructor() { }

  doViewUpdate(doUpdate: boolean) {
    this.doUpdateSource.next(doUpdate)
  }

  doViewUpdate_AnzahlBenachrichtigungen(doUpdate: boolean) {
    this.doUpdateSource_AnzahlBenachrichtigungen.next(doUpdate)
  }

  doViewUpdate_SocialScore(doUpdate: boolean) {
    this.doUpdateSource_SocialScore.next(doUpdate)
  }

  doViewUpdate_AnzahlErfuellteDienste(doUpdate: boolean) {
    this.doUpdateSource_AnzahlErfuellteDienste.next(doUpdate)
  }

 // resetUpdateStatus(resetUpdate: boolean) {
 //   this.doUpdateSource.next(resetUpdate)
 // }

}
