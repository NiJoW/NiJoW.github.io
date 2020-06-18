import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DoUpdateService {

  private doUpdateSource = new BehaviorSubject(false);
  currentDoUpdateState = this.doUpdateSource.asObservable();

  constructor() { }

  doViewUpdate(doUpdate: boolean) {
    this.doUpdateSource.next(doUpdate)
  }

 // resetUpdateStatus(resetUpdate: boolean) {
 //   this.doUpdateSource.next(resetUpdate)
 // }

}
