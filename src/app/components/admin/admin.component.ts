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
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  titre:String = "PangoBook";
  classActive = 'active';

  listesProfils:any;
  currentUsrId:any;
  displayUsrId:any;
  userDisplayId:any;
  userDisplayName:any;

  tabFollowers:any;
  tabFollowings:any;
  showfwers:any;
  showfwings:any;

  alert:boolean = false;

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

          for(let follwrs of tab){
            this.showfwers = follwrs
            //this.compteur += 1;
            for(let followigs of tab1){
              this.showfwings = followigs
              if(followigs === follwrs){
                //this.compteur -= 1;
              }
            }
          }
        }
      }
       
    });
  }

  cancelProfil(){
    this.crud.deletetUsr(this.route.snapshot.params._id).subscribe(res =>{
      this.crud.displayAllUsr().subscribe(res =>{
        this.listesProfils = res;
      });
      this.alert =true;
      return res;
    });

  }

  fermerAlert(){
    this.alert = false;

  }

}
