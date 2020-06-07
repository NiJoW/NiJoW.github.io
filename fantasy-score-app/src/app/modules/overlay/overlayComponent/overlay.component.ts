import { Component, OnInit, TemplateRef, Type } from '@angular/core';
import { MyOverlayRef } from '../myoverlay-ref';

// Source: https://codinglatte.com/posts/angular/reusable-modal-overlay-using-angular-cdk-overlay/
// https://github.com/mainawycliffe/ng-cdk-overlay-demo

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html'
})
export class OverlayComponent implements OnInit {
  contentType: 'template' | 'string' | 'component';
  content: string | TemplateRef<any> | Type<any>;
  context;

  constructor(private ref: MyOverlayRef) {}

  close() {
    this.ref.close(null);
  }

  ngOnInit() {
    this.content = this.ref.content;

    if (typeof this.content === 'string') {
      this.contentType = 'string';
    } else if (this.content instanceof TemplateRef) {
      this.contentType = 'template';
      this.context = {
        close: this.ref.close.bind(this.ref)
      };
    } else {
      this.contentType = 'component';
    }
  }
}
