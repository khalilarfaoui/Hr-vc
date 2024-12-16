import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';


const routes: Routes = [
  {path : 'user-page' , component : UtilisateurComponent},
  {path : 'change-password' , component : ChangePasswordComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilisateurRoutingModule { }
