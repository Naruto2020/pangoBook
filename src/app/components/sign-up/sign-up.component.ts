import { Component, OnInit } from '@angular/core';

import { from } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import {AuthService} from '../../partages/auth.service';
import { getParseErrors } from '@angular/compiler';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  // initialisation de l'alerte validant la creation du profil
  alert:boolean = false;

  // gestion de la validation des champs 
  soumissionPseu : boolean = false;
  soumissionNom : boolean = false;
  soumissionMdp : boolean = false;
  soumissionMail : boolean = false;

  // objet pour stocker les données saisies dans le formulaire
  addUser = new FormGroup({
    _id : new FormControl(''),
    nom : new FormControl(''),
    username: new FormControl(''),
    password : new FormControl(''),
    email : new FormControl(''),

  });

  constructor(private auth:AuthService,
    private fb: FormBuilder,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  soumettre(){

    this.auth.creatUser(this.addUser.value).subscribe(res =>{
      console.log(res);
      let results = Object.values(res);
      console.log(results);
      let errorEmail = results[0].email;
      let errorPassword = results[0].password;
      let errorNom = results[0].nom;
      let errorUsername = results[0].username;
      if(errorEmail)
        this.soumissionMail = true;
      if(errorPassword)
        this.soumissionMdp = true;
      if(errorNom)
        this.soumissionNom = true;
      if(errorUsername)
        this.soumissionPseu = true;
      
      if(!errorNom || !errorUsername || !errorEmail || !errorPassword)
        this.alert = true;
        this.addUser.reset({});
    
      return res;
        
    });
  }


  fermerAlert(){
    this.alert = false;
    this.soumissionPseu = false;
    this.soumissionNom = false;
    this.soumissionMdp = false;
    this.soumissionMail = false;
  }

}
