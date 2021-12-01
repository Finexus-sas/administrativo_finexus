import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficesCreateComponent } from './offices-create.component';

describe('OfficesCreateComponent', () => {
  let component: OfficesCreateComponent;
  let fixture: ComponentFixture<OfficesCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficesCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
