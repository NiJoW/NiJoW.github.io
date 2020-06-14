import { Component, OnInit, Input, Output } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { Dienst } from 'src/app/models/Dienst';
import { Observable } from 'rxjs';
import { AngefragteDiensteComponent } from '../dashboard/suchender/angefragte-dienste/angefragte-dienste.component';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  message: string;
  notify: boolean;
  dienstAngefragt: boolean;
  constructor(private messageService: MessageService) {}
   
  @Input() angefragteDienste: Observable<Dienst[]>;

  //@Output() onClose = new EventEmitter();

  ngOnInit(): void {
    console.dir(this.angefragteDienste);

    this.notify = false;
    console.log(this.message);
    this.messageService.currentMessage.subscribe(_message => {
      this.message = _message;
      if(_message != "")
        this.notify = true;
    });
    
   
    this.dienstAngefragt = false;

  }

  hideNotification() {
    this.notify = false;
  }

  /*close(dienstID: number) {
    this.onClose.emit(null);
  }*/

  annehmen(dienstID:number) {

  }

}
