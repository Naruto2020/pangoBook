import { Component, OnInit } from '@angular/core';

import { from } from 'rxjs';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import {CrudService} from '../../partages/crud.service';
import {AuthService} from '../../partages/auth.service';
import {environment} from 'src/environments/environment';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.css']
})
export class UserProfilComponent implements OnInit {

  titre:String = "PangoBook";
  classActive = 'active';

  imgSite:string = environment.img;
  images:any;

  url:any;

  listesProfils:any;
  currentUsrId:any;
  displayUsrId:any;
  userDisplayId:any;
  userDisplayName:any;
  userDisplayRace:any;

  tabFollowers:any;
  tabFollowings:any;
  showfwers:any;
  showfwings:any;

  compteur = 0;

  addImage = new FormGroup({
    file : new FormControl(""),
    name : new FormControl(""),
    userId : new FormControl("")
  });

  constructor(private crud:CrudService, private auth:AuthService,
    private fb: FormBuilder, private router:Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.currentUsrId = localStorage.getItem("loggedUser");
    // display all users 
    this.crud.displayAllUsr().subscribe(res =>{
      console.log(">>>",res);
      this.listesProfils = res;

      // on transforme l 'obet res en tableau cle/valeur representant chaques Ut de la BDD 
      let newR = Object.values(res);
      console.log("check ...",newR);
      for(let user of newR){
        console.log("tok", user._id);
        let tab = user.followers;
        let tab1 = user.followings;
        this.displayUsrId = user._id;
        if(this.currentUsrId === this.displayUsrId){
          this.tabFollowers = user.followers;
          this.tabFollowings = user.followings;
          this.userDisplayName = user.username;
          this.userDisplayRace = user.race;
          this.url = user.photo;
          //console.log("tof", this.imgSite + this.url);


          for(let follwrs of tab){
            this.showfwers = follwrs
            this.compteur += 1;
            for(let followigs of tab1){
              this.showfwings = followigs
              if(followigs === follwrs){
                this.compteur -= 1;
              }
            }
          }
        }
      }
       
    });
  }

 /* cancelProfil(){
    this.crud.deletetUsr(this.route.snapshot.params._id).subscribe(res =>{
      this.crud.displayAllUsr().subscribe(res =>{
        // display all usr   
        this.listesProfils = res;
      });
      console.log( "result", res);
      return res;
    });

  }*/

  // selection de l'image 
  selectImage(event:any){
    console.log(event);
    if(event.target.files.length > 0){
        const file = event.target.files[0];
        console.log(file)
      return this.images = file;
    }
      
  }

  //creation du fomulaire et ajout des valeurs saisies par l'utilisateur 
  formData = new FormData();
  chargement(){
    this.formData.append("file", this.images);
    this.formData.append("name", this.userDisplayName);
    this.formData.append("userId", this.currentUsrId);
    this.crud.uploadImage(this.formData).subscribe(res =>{
      let newR = Object.values(res);
      //this.url = `${this.imgSite}/${newR[1]}`;
      return res
    });
  
  }

  // test Delete request on friends list 
  cancelUsr(){
    console.log(this.route.snapshot.params._id)
    this.crud.deletetUsr(this.route.snapshot.params._id).subscribe(res =>{
      // display all friends 
      /*this.crud.displayAllUsr().subscribe(res =>{
        //this.listesProfils = res;
        console.log(res);
      });*/
      console.log(res)
      return res;
    });
  }

  deco(){
    this.auth.disconect();
    console.log(localStorage);
    this.router.navigate(["/"]);
  }

}
