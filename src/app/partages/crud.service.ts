import { Injectable } from '@angular/core';

import { from, Observable, throwError } from 'rxjs';
//import{HttpClient} from '@angular/common/http';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams, HttpRequest } from '@angular/common/http';

// gestion des variables d'environement
import {environment} from 'src/environments/environment';
const displayAllUrl = environment.displayUrl;
const followUrl = environment.ajtAmisUrl;
const unfollowUrl = environment.retAmisUrl;

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http:HttpClient) { }

    /***********************************************
   * **** gestion des requêtes CRUD
   */

   // display all users
   displayAllUsr(){
     return this.http.get(displayAllUrl);
   }

   // display user by id
   displayUsrId(id:any){
     return this.http.get(`${displayAllUrl}/${id}`);
   }

   // update user 
   editUsr(id:any, data:any){
     return this.http.put(`${displayAllUrl}/${id}`, data);
   }

   // delete user 
   deletetUsr(id:any){
     return this.http.delete(`${displayAllUrl}/${id}`);
   }


   /** *** *** *** gestion des requêtes amis */

   // follow 
   followUsr(id:any, data: any){
     return this.http.patch(`${followUrl}/${id}`, data);
   }

   // follow 
   unfollowUsr(id:any, data: any){
     return this.http.patch(`${unfollowUrl}/${id}`, data);
   }

}
