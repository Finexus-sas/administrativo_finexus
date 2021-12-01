import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagaduriasListComponent } from './pagadurias-list.component';

describe('PagaduriasListComponent', () => {
  let component: PagaduriasListComponent;
  let fixture: ComponentFixture<PagaduriasListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagaduriasListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagaduriasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
