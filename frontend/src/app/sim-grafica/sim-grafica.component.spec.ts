import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimGraficaComponent } from './sim-grafica.component';

describe('SimGraficaComponent', () => {
  let component: SimGraficaComponent;
  let fixture: ComponentFixture<SimGraficaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimGraficaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimGraficaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
