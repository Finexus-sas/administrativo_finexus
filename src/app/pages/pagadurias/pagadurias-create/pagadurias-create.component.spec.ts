import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagaduriasCreateComponent } from './pagadurias-create.component';

describe('PagaduriasCreateComponent', () => {
  let component: PagaduriasCreateComponent;
  let fixture: ComponentFixture<PagaduriasCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagaduriasCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagaduriasCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
