import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  message: string;
  notify: boolean;
  constructor() { }

  ngOnInit(): void {
    this.notify = false;
  }

  showNotification(_message: string) {
    this.message = _message;
    this.notify = true;
  }

  hideNotification() {
    this.notify = false;
  }

}
