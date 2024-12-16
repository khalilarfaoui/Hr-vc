import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OffreComponent } from './offre.component';

const routes: Routes = [
  {
    path : "offre-page" , component : OffreComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OffreRoutingModule { }
