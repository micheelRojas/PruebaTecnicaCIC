import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTutorComponent } from './form-tutor.component';

describe('FormTutorComponent', () => {
  let component: FormTutorComponent;
  let fixture: ComponentFixture<FormTutorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTutorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
