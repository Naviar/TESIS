import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefinirhorariosComponent } from './definirhorarios.component';

describe('DefinirhorariosComponent', () => {
  let component: DefinirhorariosComponent;
  let fixture: ComponentFixture<DefinirhorariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefinirhorariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefinirhorariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
