import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitadiagnosticoComponent } from './citadiagnostico.component';

describe('CitadiagnosticoComponent', () => {
  let component: CitadiagnosticoComponent;
  let fixture: ComponentFixture<CitadiagnosticoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitadiagnosticoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitadiagnosticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
