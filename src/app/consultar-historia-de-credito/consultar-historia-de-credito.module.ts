import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

import { ConsultarHistoriaDeCreditoComponent } from './consultar-historia-de-credito.component'
import { ConsultarHistoriaRoutes } from './consultar-historia-de-credito.routing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxLoadingModule } from 'ngx-loading';

import {
  ReactiveFormsModule,
  FormsModule
} from "@angular/forms"

@NgModule({
  declarations: [ConsultarHistoriaDeCreditoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxLoadingModule,
    RouterModule.forChild(ConsultarHistoriaRoutes),
  ],

})
export class ConsultarHistoriaDeCreditoModule { }
