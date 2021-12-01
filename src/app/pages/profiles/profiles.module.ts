import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';


import { ProfilesRoutes } from './profiles.routing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxLoadingModule } from 'ngx-loading';

import {
  ReactiveFormsModule,
  FormsModule
} from "@angular/forms";
import { ProfilesListComponent } from './profiles-list/profiles-list.component';

@NgModule({
  declarations: [ProfilesListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxLoadingModule,
    NgxDatatableModule,
    RouterModule.forChild(ProfilesRoutes),
  ],

})
export class ProfilesModule { }
