import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtpRoutingModule } from './otp-routing.module';
import { OtpComponent } from './otp.component';


@NgModule({
  declarations: [
    OtpComponent
  ],
  imports: [
    CommonModule,
    OtpRoutingModule
  ]
})
export class OtpModule { }
