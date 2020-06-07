import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SubscribeComponent } from './subscribe.component';

// Source: https://codinglatte.com/posts/angular/reusable-modal-overlay-using-angular-cdk-overlay/
// https://github.com/mainawycliffe/ng-cdk-overlay-demo


describe('SubscribeComponent', () => {
  let component: SubscribeComponent;
  let fixture: ComponentFixture<SubscribeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscribeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
