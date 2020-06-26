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
  typ: boolean;
  notify: boolean;
  constructor(private messageService: MessageService) {}
   
  

  //@Output() onClose = new EventEmitter();

  ngOnInit(): void {


    this.notify = false;

    console.log(this.message);
    this.messageService.currentMessage.subscribe(data => {
      if(data[0] != "") {
        console.log(data);
        this.message = data[0];
        this.typ = data[1];
        this.notify = true;
      } else {
        this.notify = false;
      }
      
    });

  }

  hideNotification() {
    this.notify = false;
  }

  /*close(dienstID: number) {
    this.onClose.emit(null);
  }*/


}
