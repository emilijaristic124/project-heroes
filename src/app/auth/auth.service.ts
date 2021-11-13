import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlSegment } from '@angular/router';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from './user.model';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

interface AuthResponseData{
kind:string;
idToken:string;
email:string;
refreshToken:string;
localId:string;
expiresIn:string;
registered?:boolean;
}


interface UserData{
  email:string;
  password:string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   private userAuth= false;
   private _user= new BehaviorSubject<User>(null);

  constructor(private http: HttpClient,private alertController: AlertController,private router:Router) { }

  get isUserAuth(){
    return this._user.asObservable().pipe(
      map((user)=>{
        if(user){
          return !!user.token;
        } else {
          return false;
        }
      })
    );
  }


  get userId(){
    return this._user.asObservable().pipe(
      map((user)=>{
        if(user){
          return user.id;
        }else {
          return null;
        }
      })
    )
  }

  register(user: UserData){
    this.userAuth=true;
   return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebase.apiKey}`,
    {
      email: user.email,
      password: user.password,
      returnSecureToken:true
    }).pipe(
      tap( (userData)=>{
        const expirationTime= new Date(new Date().getTime()+ +userData.expiresIn*1000);
        const user= new User(userData.localId,userData.email,userData.idToken,expirationTime);
        this._user.next(user);
        this.succesRegister();
        this.router.navigateByUrl('/login');
      }, error => {
        this.presentAlertLogIn();}
      )
    )
  }

  async presentAlertLogIn() {
    const alert = await this.alertController.create({
      header: 'Whoops!',
      message: 'Your email or password is not correct, please try again.',
      buttons: ['OK']
    })
    await alert.present();
  }

  async succesRegister() {
    const alert = await this.alertController.create({
      header: 'Success!',
      message: 'Your account has been created.',
      buttons: ['OK']
    })
    await alert.present();
  }

  logIn(user: UserData){
    this.userAuth=true;
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebase.apiKey}`,
    {
      email: user.email,
      password: user.password,
      returnSecureToken:true
    }).pipe(
      tap((userData)=>{
        console.log("podaci o korisnku");
        const expirationTime= new Date(new Date().getTime()+ + userData.expiresIn*1000);
        const user= new User(userData.localId,userData.email,userData.idToken,expirationTime);
        this._user.next(user);
      }, error => {
        this.presentAlertLogIn();
    
         
     })
      
    )
   
  }
 
  

  logOut(){
    this._user.next(null);
  }
}
