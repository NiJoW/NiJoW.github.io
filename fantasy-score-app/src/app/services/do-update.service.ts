import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DoUpdateService {

  private doUpdateSource = new BehaviorSubject(false);
  currentDoUpdateState = this.doUpdateSource.asObservable();

  private doUpdateSource_AnzahlBenachrichtigungen = new BehaviorSubject(false);
  currentDoUpdateState_AnzahlBenachrichtigungen = this.doUpdateSource_AnzahlBenachrichtigungen.asObservable();

  constructor() { }

  doViewUpdate(doUpdate: boolean) {
    this.doUpdateSource.next(doUpdate)
  }

  doViewUpdate_AnzahlBenachrichtigungen(doUpdate: boolean) {
    this.doUpdateSource_AnzahlBenachrichtigungen.next(doUpdate)
  }

 // resetUpdateStatus(resetUpdate: boolean) {
 //   this.doUpdateSource.next(resetUpdate)
 // }

}
