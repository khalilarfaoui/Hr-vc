import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecalamtionComponent } from './recalamtion.component';
import { ReclamationRoute } from './reclamtion.route';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReclamationRoute,
    SharedModule
  ],
  declarations: [RecalamtionComponent]
})
export class RecalamtionModule { }
