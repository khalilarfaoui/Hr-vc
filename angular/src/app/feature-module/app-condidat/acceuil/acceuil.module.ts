import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcceuilComponent } from './acceuil.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AcceuilRoutingModule } from './acceuil-routing.module';
import { ViewDetailsComponent } from '../view-details/view-details.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AcceuilRoutingModule

  ],
  declarations: [AcceuilComponent ,    ViewDetailsComponent]
})
export class AcceuilModule { }
