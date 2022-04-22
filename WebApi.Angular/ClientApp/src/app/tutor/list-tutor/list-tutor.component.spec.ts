import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTutorComponent } from './list-tutor.component';

describe('ListTutorComponent', () => {
  let component: ListTutorComponent;
  let fixture: ComponentFixture<ListTutorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTutorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
