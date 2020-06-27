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

  ngOnInit(): void {

    this.messageService.currentMessage.subscribe(data => {
      this.notify = false;
      if(data[0] == undefined) {
        return;
      }
      this.message = data[0];
      this.typ = data[1];
      this.notify = true;      
    });

  }

  hideNotification() {
    this.notify = false;
  }

}
