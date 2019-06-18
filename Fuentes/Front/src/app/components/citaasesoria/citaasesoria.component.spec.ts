import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitaasesoriaComponent } from './citaasesoria.component';

describe('CitaasesoriaComponent', () => {
  let component: CitaasesoriaComponent;
  let fixture: ComponentFixture<CitaasesoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitaasesoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitaasesoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
