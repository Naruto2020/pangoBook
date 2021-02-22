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
  selector: 'app-self-update',
  templateUrl: './self-update.component.html',
  styleUrls: ['./self-update.component.css']
})
export class SelfUpdateComponent implements OnInit {

    // objet pour stocker les données saisies dans le formulaire
    editProfil = new FormGroup({
      //_id : new FormControl(''),
      //photo :  new FormControl(''),
      username: new FormControl(''),
      age : new FormControl(''),
      famille : new FormControl(''),
      race : new FormControl(''),
      nourriture : new FormControl(''),
       _id : new FormControl('')
           
    });
  
    displayUsrName:any;
    displayUsrId:any;
  
    currentUsrId:any;
    myId:any;
  
    listeProfils:any;

  constructor(private crud:CrudService, private auth:AuthService,
    private fb: FormBuilder,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.currentUsrId = localStorage.getItem("loggedUser");

    console.log(this.route.snapshot.params._id);
    // recuperation de la reponse suite a la requête donneeCourante du composant service
    this.crud.displayUsrId(this.route.snapshot.params._id).subscribe(res =>{

      console.log("look", res);
      // on transforme l 'obet res en tableau cle/valeur representant chaques Ut de la BDD 
      let newR = Object.values(res);
      console.log("check ...",newR);
      /*for(let user of newR){
        //console.log("tok", user._id);
      }*/
      this.displayUsrName = newR[5];
      this.displayUsrId = newR[3];
      this.editProfil = new FormGroup({
        // photo :  new FormControl(results["photo"]),
          username: new FormControl(newR[5]),    
          age : new FormControl(newR[10]),
          famille : new FormControl(newR[11]),
          nourriture : new FormControl(newR[12]),
          race : new FormControl(newR[13]),
      });
    });

    // current user
    this.crud.displayAllUsr().subscribe(res =>{
      this.listeProfils = res;
      let newR = Object.values(res);
      for(let users of newR){
        if(users._id === this.currentUsrId){
          this.myId = users._id;
          console.log("mon id",this.myId);
        }
      }
    });
  }

  mettreAjour(){
    this.crud.editUsr(this.route.snapshot.params._id, this.editProfil.value).subscribe(res =>{

      // on transforme l 'obet res en tableau cle/valeur representant chaques Ut de la BDD 
      let newR = Object.values(res);
      console.log("check ...",newR);
  
      this.displayUsrName = newR[5];
      this.displayUsrId = newR[3];
      this.editProfil = new FormGroup({
        // photo :  new FormControl(results["photo"]),
          username: new FormControl(newR[5]),    
          age : new FormControl(newR[10]),
          famille : new FormControl(newR[11]),
          nourriture : new FormControl(newR[12]),
          race : new FormControl(newR[13]),
      });

    });
  }

}
