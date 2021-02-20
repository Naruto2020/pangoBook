import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { from } from 'rxjs';

import {SignUpComponent} from './components/sign-up/sign-up.component';
import {SignInComponent} from './components/sign-in/sign-in.component';
import {UserHomeComponent} from './components/user-home/user-home.component';
import {UserAddComponent} from './components/user-add/user-add.component';
import {UserNotifComponent} from './components/user-notif/user-notif.component';
import {UserProfilComponent} from './components/user-profil/user-profil.component';
import {UserUpdateComponent} from './components/user-update/user-update.component';

//admin 
import {AdminComponent} from './components/admin/admin.component';

// gard
import {SecurGuard} from './partages/secur.guard';

/** point d'acces app */
import {UtilisateursComponent} from './components/utilisateurs/utilisateurs.component';

const routes: Routes = [
  {path:"", component:UtilisateursComponent},
  {path:"inscription", component:SignUpComponent},
  {path:"login", component:SignInComponent, canActivate:[SecurGuard], data:['user']},
  {path:"accueil", component:UserHomeComponent, canActivate:[SecurGuard], data:['user']},
  {path:"add_user/:_id", component:UserAddComponent, canActivate:[SecurGuard], data:['user']},
  {path:"notifications", component:UserNotifComponent, canActivate:[SecurGuard], data:['user']},
  {path:"user-profil", component:UserProfilComponent, canActivate:[SecurGuard], data:['user']},
  {path:"user-update-profil/:_id", component:UserUpdateComponent},
  //admin 
  {path:"admin/:_id", component:AdminComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
