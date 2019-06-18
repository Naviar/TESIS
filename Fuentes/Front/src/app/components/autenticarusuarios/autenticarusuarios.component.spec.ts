import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutenticarusuariosComponent } from './autenticarusuarios.component';

describe('AutenticarusuariosComponent', () => {
  let component: AutenticarusuariosComponent;
  let fixture: ComponentFixture<AutenticarusuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutenticarusuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutenticarusuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
