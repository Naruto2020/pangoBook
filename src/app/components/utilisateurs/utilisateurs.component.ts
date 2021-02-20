import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})
export class UtilisateursComponent implements OnInit {
  alert1:boolean = true;
  alert2:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleSign(){
    if(this.alert1 === true){
      this.alert1 = false;
    }else{
      this.alert1= true;
    }

    if(this.alert2 === false){
      this.alert2 = true;
    }else{
      this.alert2= false;
    }
    
  }
}
