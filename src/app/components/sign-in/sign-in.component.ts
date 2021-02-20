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
      this.goToProfil.reset({});
      this.router.navigate(["/accueil"]);
      // gestion du stockage des données dans la session du nav 
      //localStorage.setItem("loggedUser", res)
      let newR = Object.values(res);
      console.log("vue",newR[0]);
      localStorage.setItem("loggedUser", newR[0]);
    });

  }

}
