import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesRoutingModule } from './messages-routing.module';
import { MessagesComponent } from './messages.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    MessagesComponent
  ],
  imports: [
    CommonModule,
    MessagesRoutingModule,
    SharedModule
  ]
})
export class MessagesModule { }
