import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReclamationAdminComponent } from './reclamation-admin.component';

const routes: Routes = [
    {
      path : "reclamtion-admin" , component : ReclamationAdminComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReclamationAdminRoutingModule { }
