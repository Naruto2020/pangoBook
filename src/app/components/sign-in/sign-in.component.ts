import { Component, OnInit } from '@angular/core';

import { from } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import {AuthService} from '../../partages/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  alert1 : boolean = false;
  alert2 : boolean = false;

  soumissionMdp : boolean = false;
  soumissionMail : boolean = false;

  goToProfil = new FormGroup({
    email : new FormControl(""),
    password : new FormControl(""),
  });

  constructor(private auth:AuthService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
  }

  connexion(){
    this.auth.signIn(this.goToProfil.value).subscribe(res =>{
      console.log(res);
      let results = Object.values(res);
      console.log("vue",results[0]);
      let emailError = results[0].email;
      let passwordError = results[0].password;
      if(emailError){
        this.soumissionMail = true;
      }else if(passwordError){
        this.soumissionMdp = true;
      }else{
        this.goToProfil.reset({});
        this.router.navigate(["/accueil"]);
        // gestion du stockage des données dans la session du nav 
        localStorage.setItem("loggedUser", results[0]);

      }
      
    });

  }

  fermerAlert(){
    this.soumissionMdp = false;
    this.soumissionMail = false;
  }

}
