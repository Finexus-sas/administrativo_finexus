import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PagaduriasRoutes } from './pagadurias.routing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxLoadingModule } from 'ngx-loading';

import {
  ReactiveFormsModule,
  FormsModule
} from "@angular/forms";
import { PagaduriasListComponent } from './pagadurias-list/pagadurias-list.component';
import { PagaduriasCreateComponent } from './pagadurias-create/pagadurias-create.component';

@NgModule({
  declarations: [PagaduriasListComponent, PagaduriasCreateComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxLoadingModule,
    NgxDatatableModule,
    RouterModule.forChild(PagaduriasRoutes),
  ],

})
export class PagaduriasModule { }
