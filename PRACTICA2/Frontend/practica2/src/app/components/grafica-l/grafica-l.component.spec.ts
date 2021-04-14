import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaLComponent } from './grafica-l.component';

describe('GraficaLComponent', () => {
  let component: GraficaLComponent;
  let fixture: ComponentFixture<GraficaLComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficaLComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficaLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
