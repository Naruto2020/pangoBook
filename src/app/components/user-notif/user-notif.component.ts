import { Component, OnInit } from '@angular/core';

import { from } from 'rxjs';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import {CrudService} from '../../partages/crud.service';
import {AuthService} from '../../partages/auth.service';
import {environment} from 'src/environments/environment';

@Component({
  selector: 'app-user-notif',
  templateUrl: './user-notif.component.html',
  styleUrls: ['./user-notif.component.css']
})
export class UserNotifComponent implements OnInit {

  titre:String = "PangoBook";
  compteur = 0;

  displayUsrName:any;
  displayUsrId:any;
  currentUsrId:any;
  myId:any;
  tabFollowers:any;
  tabFollowings:any;
  

  listeProfil:any;

  constructor(private crud: CrudService, private auth: AuthService , private route: Router, private router : ActivatedRoute) { }

  ngOnInit(): void {
    this.currentUsrId = localStorage.getItem("loggedUser");
    // user list 
    this.crud.displayAllUsr().subscribe(res =>{

      this.listeProfil = res;
      // on map l'objet en tableau 
      let newR = Object.values(res);
      console.log("vue",newR);
      for(let users of newR){
        console.log("top",users.followers);
        let tab = users.followers;
        let tab1 = users.followings;
        this.displayUsrId = users._id;
        if(this.currentUsrId === this.displayUsrId){
          this.tabFollowers = users.followers;
          this.tabFollowings = users.followigs
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

}
