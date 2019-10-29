import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarproyectoComponent } from './buscarproyecto.component';

describe('BuscarproyectoComponent', () => {
  let component: BuscarproyectoComponent;
  let fixture: ComponentFixture<BuscarproyectoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarproyectoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarproyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
