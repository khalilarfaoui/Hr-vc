import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostulationListComponent } from './postulation-list.component';

const routes: Routes = [
  {
    path : "postulation-page" , component : PostulationListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostulationListRoutingModule { }
