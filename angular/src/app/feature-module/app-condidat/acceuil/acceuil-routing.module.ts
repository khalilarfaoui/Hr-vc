import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcceuilComponent } from './acceuil.component';
import { ViewDetailsComponent } from '../view-details/view-details.component';
import { PostulerComponent } from '../postuler/postuler.component';

const routes: Routes = [
  {
    path : "acceuil-page" , component : AcceuilComponent
  },
  { path: 'offre-details/:id', component: ViewDetailsComponent },

  { path: 'postuler/:id', component: PostulerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcceuilRoutingModule { }
