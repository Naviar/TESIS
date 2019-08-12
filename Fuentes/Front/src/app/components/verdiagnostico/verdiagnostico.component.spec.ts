import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerdiagnosticoComponent } from './verdiagnostico.component';

describe('VerdiagnosticoComponent', () => {
  let component: VerdiagnosticoComponent;
  let fixture: ComponentFixture<VerdiagnosticoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerdiagnosticoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerdiagnosticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
