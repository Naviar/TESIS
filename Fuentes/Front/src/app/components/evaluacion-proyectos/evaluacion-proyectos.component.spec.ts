import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionProyectosComponent } from './evaluacion-proyectos.component';

describe('EvaluacionProyectosComponent', () => {
  let component: EvaluacionProyectosComponent;
  let fixture: ComponentFixture<EvaluacionProyectosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluacionProyectosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluacionProyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
