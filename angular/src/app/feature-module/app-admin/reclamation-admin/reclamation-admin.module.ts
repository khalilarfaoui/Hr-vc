import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReclamationAdminRoutingModule } from './reclamation-admin-routing.module';
import { ReclamationAdminComponent } from './reclamation-admin.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ReclamationAdminComponent
  ],
  imports: [
    CommonModule,
    ReclamationAdminRoutingModule,
    SharedModule
  ]
})
export class ReclamationAdminModule { }
