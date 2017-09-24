import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulacionComponent } from './simulacion.component';

describe('SimulacionComponent', () => {
  let component: SimulacionComponent;
  let fixture: ComponentFixture<SimulacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
