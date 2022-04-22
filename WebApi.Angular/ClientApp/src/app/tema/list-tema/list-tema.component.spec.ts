import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTemaComponent } from './list-tema.component';

describe('ListTemaComponent', () => {
  let component: ListTemaComponent;
  let fixture: ComponentFixture<ListTemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
