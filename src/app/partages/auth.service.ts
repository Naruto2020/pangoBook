import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
//import{HttpClient} from '@angular/common/http';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams, HttpRequest } from '@angular/common/http';

// gestion des variables d'environement
import {environment} from 'src/environments/environment';
const signUpUrl = environment.creatUrl;
const loginUrl = environment.connectUrl;
const logoutUrl = environment.disconectUrl;
const currentUsrUrl = environment.jwtUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

    /***********************************************
   * **** gestion des requêtes Auth 
   */

   // singUp
   creatUser(data: any) {
     return this.http.post(signUpUrl, data);
   }

   // login 
   signIn(data: any){
     return this.http.post(loginUrl, data);
   }

   //logout 
   disconect(){
    localStorage.removeItem('loggedUser');
   }

   // jwt
   usrUrl(){
     return this.http.get(currentUsrUrl);
   }
}
