import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostulationListRoutingModule } from './postulation-list-routing.module';
import { PostulationListComponent } from './postulation-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SafeUrlPipe } from './safe-url-pipe';


@NgModule({
  declarations: [
    PostulationListComponent,
    SafeUrlPipe
  ],
  imports: [
    CommonModule,
    PostulationListRoutingModule,
    SharedModule,

  ]
})
export class PostulationListModule { }
