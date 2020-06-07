import {Component, OnInit, TemplateRef} from '@angular/core';
import {ComponentType} from "@angular/cdk/overlay";
import {OverlayService} from "../../../overlay/overlay.service";
import {SubscribeComponent} from "../../../overlay/subscribe/subscribe.component";


@Component({
  selector: 'app-erstelle-tugend-overlay',
  templateUrl: './erstelle-tugend-overlay.component.html',
  styleUrls: ['./erstelle-tugend-overlay.component.css']
})
export class ErstelleTugendOverlayComponent implements OnInit {

  subscribeComponent = SubscribeComponent;
  content = 'A simple string content modal overlay';
  subscribeData = null;

  constructor(private overlayService: OverlayService) { }

  ngOnInit(): void {
  }


  open(content: TemplateRef<any> | ComponentType<any> | string) {
    const ref = this.overlayService.open(content, null);

    ref.afterClosed$.subscribe(res => {
      if (content === this.subscribeComponent) {
        this.subscribeData = res.data;
      }
    });
  }
}
