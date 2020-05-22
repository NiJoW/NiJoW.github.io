import { Component, OnInit } from '@angular/core';
import { MyOverlayRef } from '../myoverlay-ref';
import { FormBuilder, Validators } from '@angular/forms';

// Source: https://codinglatte.com/posts/angular/reusable-modal-overlay-using-angular-cdk-overlay/
// https://github.com/mainawycliffe/ng-cdk-overlay-demo

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html'
})
export class SubscribeComponent implements OnInit {
  frmSubscribe = this.fb.group({
    name: 'John Doe',
    email: [
      'johndoe@gmail.com',
      Validators.compose([Validators.email, Validators.required])
    ]
  });

  constructor(private fb: FormBuilder, private ref: MyOverlayRef) {}

  ngOnInit() {}

  submit() {
    this.ref.close(this.frmSubscribe.value);
  }

  cancel() {
    this.ref.close(null);
  }
}
