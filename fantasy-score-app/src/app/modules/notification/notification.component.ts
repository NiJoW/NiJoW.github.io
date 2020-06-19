import { Component, OnInit, Input, Output } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  message: string;
  notifySuccess: boolean;
  notifyDanger: boolean;
  constructor(private messageService: MessageService) {}
   
  

  //@Output() onClose = new EventEmitter();

  ngOnInit(): void {


    this.notifySuccess = false;

    console.log(this.message);
    this.messageService.currentMessage.subscribe(_message => {
      this.message = _message;
      if(_message != "") {
        if(_message = "Die Tugend ist bereits in deinem Dashboard.") {
          this.notifyDanger = true;
          return;
        }
        this.notifySuccess = true;
      }
    });

  }

  hideNotification() {
    this.notifyDanger = false;
    this.notifySuccess = false;
  }

  /*close(dienstID: number) {
    this.onClose.emit(null);
  }*/


}
