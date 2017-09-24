import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistribucionComponent } from './distribucion.component';

describe('DistribucionComponent', () => {
  let component: DistribucionComponent;
  let fixture: ComponentFixture<DistribucionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistribucionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistribucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
