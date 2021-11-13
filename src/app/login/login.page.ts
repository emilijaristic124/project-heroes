import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AuthService } from '../auth/auth.service';
import { NgForm } from '@angular/forms';
import { ThisReceiver } from '@angular/compiler';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
   email:string;
   password:string;
  constructor(private router:Router, private authService: AuthService) { }

  ngOnInit() {
  }
  
    logMeIn(form:NgForm) {
      console.log(form.value);
      this.authService.logIn(form.value).subscribe(resData=>{  
      this.router.navigateByUrl("/heroes");
    });
  
    
 
    
   
   

 //   this.authService.logIn();
   // console.log(this.authService.isUserAuth);
    //this.router.navigateByUrl('/heroes');
    //console.log('login dugme');
     
  //  this.email=`${this.email}`;
   // this.password=`${this.password}`;

    //console.log(this.email);   
    //console.log(this.password);
    // const user= await this.ngFireAuth.signInWithEmailAndPassword(this.email,this.password);
    //console.log(user.user.email);

   //if(user){
     // this.router.navigate(['/heroes']);
   // } else {
     // alert('Log in failed, try again!');
  // }
  }

  register()  {
    console.log("click na register dugme");
    this.router.navigateByUrl('/register');
    console.log("ispod");
   }
  }


