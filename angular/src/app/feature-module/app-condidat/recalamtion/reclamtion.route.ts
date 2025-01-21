import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecalamtionComponent } from './recalamtion.component';

const routes: Routes = [
  {
    path : "reclamtion-page" , component : RecalamtionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReclamationRoute { }
