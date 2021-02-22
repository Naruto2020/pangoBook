import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UtilisateursComponent } from './components/utilisateurs/utilisateurs.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { UserAddComponent } from './components/user-add/user-add.component';
import { UserNotifComponent } from './components/user-notif/user-notif.component';
import { UserProfilComponent } from './components/user-profil/user-profil.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { AdminComponent } from './components/admin/admin.component';
import { SelfUpdateComponent } from './components/self-update/self-update.component';

@NgModule({
  declarations: [
    AppComponent,
    UtilisateursComponent,
    SignUpComponent,
    SignInComponent,
    UserHomeComponent,
    UserAddComponent,
    UserNotifComponent,
    UserProfilComponent,
    UserUpdateComponent,
    AdminComponent,
    SelfUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
