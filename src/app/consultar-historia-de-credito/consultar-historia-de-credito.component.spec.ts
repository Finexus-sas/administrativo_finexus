import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarHistoriaDeCreditoComponent } from './consultar-historia-de-credito.component';

describe('ConsultarHistoriaDeCreditoComponent', () => {
  let component: ConsultarHistoriaDeCreditoComponent;
  let fixture: ComponentFixture<ConsultarHistoriaDeCreditoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultarHistoriaDeCreditoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarHistoriaDeCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
