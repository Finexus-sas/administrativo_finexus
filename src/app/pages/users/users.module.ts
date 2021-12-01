import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

import { UsersComponent } from './list-users/users.component'
import { UserRoutes } from './users.routing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxLoadingModule } from 'ngx-loading';

import {
  ReactiveFormsModule,
  FormsModule
} from "@angular/forms";
import { UsersCreateComponent } from './users-create/users-create.component'

@NgModule({
  declarations: [UsersComponent, UsersCreateComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxLoadingModule,
    NgxDatatableModule,
    RouterModule.forChild(UserRoutes),
  ],

})
export class UsersModule { }
