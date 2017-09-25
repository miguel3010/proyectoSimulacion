import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelListadoComponent } from './panel-listado.component';

describe('PanelListadoComponent', () => {
  let component: PanelListadoComponent;
  let fixture: ComponentFixture<PanelListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
