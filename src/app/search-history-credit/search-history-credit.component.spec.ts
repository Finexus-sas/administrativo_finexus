import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchHistoryCreditComponent } from './search-history-credit.component';

describe('SearchHistoryCreditComponent', () => {
  let component: SearchHistoryCreditComponent;
  let fixture: ComponentFixture<SearchHistoryCreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchHistoryCreditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchHistoryCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
