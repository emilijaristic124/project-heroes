import { Component, OnInit } from '@angular/core';
//import { Router } from '@angular/router';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AuthService } from '../auth/auth.service';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})


export class RegisterPage implements OnInit {

  userData:{
    email:string,
     password:string
 
  }
  

  constructor( public ngFireAuth: AngularFireAuth, private authService:AuthService) { }

  ngOnInit() {
  }

  onRegister(form:NgForm){
   this.userData=form.value;
  
  console.log(this.userData.email);
  console.log(this.userData.password);
   

    this.authService.register(this.userData).subscribe(resData=>{
      
    })
  
  }
//  async register() {
  //this.email=`${this.email}`;
  //this.password=`${this.password}`;
  
  // const user= await this.ngFireAuth.createUserWithEmailAndPassword(this.email,this.password);
    //console.log(user);

    //if(user){
     // alert('registration successful!');
    //} else {
      //alert('registraion failed!');
   //}
  
  //}
}
