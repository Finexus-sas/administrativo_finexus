import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RequestsRoutes } from './requests.routing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxLoadingModule } from 'ngx-loading';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RequestsListComponent } from './requests-list/requests-list.component';


@NgModule({
  declarations: [RequestsListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxLoadingModule,
    NgxDatatableModule,
    RouterModule.forChild(RequestsRoutes),
  ]
})
export class RequestsModule { }
