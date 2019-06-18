import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionasesoriasComponent } from './gestionasesorias.component';

describe('GestionasesoriasComponent', () => {
  let component: GestionasesoriasComponent;
  let fixture: ComponentFixture<GestionasesoriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionasesoriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionasesoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
