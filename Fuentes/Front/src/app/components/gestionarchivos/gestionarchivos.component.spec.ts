import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarchivosComponent } from './gestionarchivos.component';

describe('GestionarchivosComponent', () => {
  let component: GestionarchivosComponent;
  let fixture: ComponentFixture<GestionarchivosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionarchivosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarchivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
