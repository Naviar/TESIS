import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerevaluacionComponent } from './verevaluacion.component';

describe('VerevaluacionComponent', () => {
  let component: VerevaluacionComponent;
  let fixture: ComponentFixture<VerevaluacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerevaluacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerevaluacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
