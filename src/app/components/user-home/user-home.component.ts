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
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  titre:String = "PangoBook";
  classActive = 'active';

  listesProfils:any;
  currentUsrId:any;
  displayUsrId:any;
  userDisplayId:any;

  tabFollowers:any;
  tabFollowings:any;

  compteur = 0;

  goToUser = new FormGroup({
    nom : new FormControl(''),
  });

  addAmis = new FormGroup({
    //sendBy : new FormControl(""),
    //acceptBy : new FormControl("")
    idToFollow: new FormControl("")
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
          this.tabFollowings = user.followigs;

          for(let follwrs of tab){
            this.compteur += 1;
            for(let followigs of tab1){
              if(followigs === follwrs){
                this.compteur -= 1;
              }
            }
          }
        }
      }
       
    });
  }

  deco(){
    this.auth.disconect();
    console.log(localStorage);
    this.router.navigate(["/"]);
  }

  connexion(){

  }

}
