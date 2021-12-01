import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';


import { UserRoutes } from './offices.routing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxLoadingModule } from 'ngx-loading';

import {
  ReactiveFormsModule,
  FormsModule
} from "@angular/forms";
import { OfficesCreateComponent } from './offices-create/offices-create.component';
import { OfficesListComponent } from './offices-list/offices-list.component';

@NgModule({
  declarations: [OfficesListComponent, OfficesCreateComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxLoadingModule,
    NgxDatatableModule,
    RouterModule.forChild(UserRoutes),
  ],

})
export class OfficesModule { }
