import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerasesoriaComponent } from './verasesoria.component';

describe('VerasesoriaComponent', () => {
  let component: VerasesoriaComponent;
  let fixture: ComponentFixture<VerasesoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerasesoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerasesoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
