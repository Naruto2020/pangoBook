import { Component, OnInit } from '@angular/core';

import { from } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import {AuthService} from '../../partages/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  // initialisation de l'alerte validant la creation du profil
  alert:boolean = false;

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
      this.addUser.reset({});
      this.alert = true;
      return res;
    });
  }


  fermerAlert(){
    this.alert = false;
   /* this.soumissionFich = false;
    this.soumissionNomPrePseu = false;
    this.soumissionMdpGenMail = false;
    this.soumissionAgePrefNiv = false;*/
  }

}
