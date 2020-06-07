import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoTugendenComponent } from './todo-tugenden.component';

describe('TodoTugendenComponent', () => {
  let component: TodoTugendenComponent;
  let fixture: ComponentFixture<TodoTugendenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoTugendenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoTugendenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
