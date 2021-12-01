import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

import { SearchHistoryCreditComponent } from './search-history-credit.component';
import { SearchHistoryCreditRoutes } from './search-history-credit.routing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SearchHistoryCreditRoutes),
    NgbAccordionModule,
    NgxDatatableModule
  ],
  declarations: [SearchHistoryCreditComponent]
})
export class SearchHistoryCreditModule { }

