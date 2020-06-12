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
  constructor(private messageService: MessageService) {
    this.messageService.getMessage().subscribe((data:string) => {
      this.message = data;
      console.log("this.message");
    });
   }

  ngOnInit(): void {
    this.notify = false;
    console.log(this.message);
    
   
  }

  /*
  showNotification(_message: string) {
    this.message = _message;
    this.notify = true;
  }

  hideNotification() {
    this.notify = false;
  }*/

}
