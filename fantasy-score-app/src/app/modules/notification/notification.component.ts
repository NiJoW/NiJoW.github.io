import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  message: string;
  notify: boolean;
  constructor(private messageService: MessageService) {}
   

  ngOnInit(): void {
    this.notify = false;
    console.log(this.message);
    this.messageService.currentMessage.subscribe(_message => {
      this.message = _message;
      if(_message != "")
        this.notify = true;
    });
    
   
  }

  hideNotification() {
    this.notify = false;
  }

}
