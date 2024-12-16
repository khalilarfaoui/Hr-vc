import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffreComponent } from './offre.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OffreRoutingModule } from './offre-routing.module';

@NgModule({
  imports: [CommonModule, OffreRoutingModule, SharedModule],
  declarations: [OffreComponent],
})
export class OffreModule {}
