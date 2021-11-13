import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { ReturnStatement } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { HeroeModel } from './heroe-model';
import {tap,map, switchMap, take, find} from 'rxjs/operators';
import {BehaviorSubject,concat, Observable} from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Key } from 'selenium-webdriver';
import { element } from 'protractor';
//import 'rxjs/add/operator/map';


interface HeroeData{
  id:string;
  name:string;
  picture:string;
  health:number;
  damage:number;
  userId:string;
}

@Injectable({
  providedIn: 'root'
})
export class HeroesService {




 private _heroes= new BehaviorSubject<HeroeModel[]>([]);
 httpOptions = {
 
  headers: new HttpHeaders({
   'Access-Control-Allow-Origin': 'http://localhost:8100',
    'Content-Type' : 'application/json',

  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS,PUT',

   'Access-Control-Allow-Headers': 'Content-Type'
 
    
    }),
};
// headers('Access-Control-Allow-Origin: http://localhost:8100')
// header ("Access-Control-Expose-Headers: Content-Length, X-JSON"),
// header ("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
// header ("Access-Control-Allow-Headers: Content-Type, Authorization, Accept, Accept-Language, X-Authorization");
// header('Access-Control-Max-Age: 86400');
  // heroes: HeroeModel[]= [
   // {id: "id1",name:"ime 1",picture:"assets/hero1.jpg",damage:11,health:111},
   // {id: "id2",name:"ime 2",picture:"assets/hero1.jpg",damage:22,health:222}              
//];

  constructor(private http:HttpClient,private authService:AuthService) { }

  get heroes() {

    return this._heroes.asObservable();
  }

 

  editHeroe(id, name, health, damage, picture){
   // const heroes: HeroeModel[]=[];
   let forUpdate: HeroeModel;
   //id je okej, za sve ostalo treba da ide.value
   this._heroes.asObservable().subscribe(result=>{
    result.forEach(element => {
      if(element.id==id){
      console.log("probam da editujem");
      element.name=name.value;
      element.health=health.value;
      element.damage=damage.value;
      element.picture=picture.value;
      forUpdate=element;
      }
    }
   
    );
  
    console.log("za updatic ide");
    console.log(forUpdate);
    return this.http.put(`https://project-heroes-e78cb-default-rtdb.europe-west1.firebasedatabase.app/heroes/`+id+ `.json`,JSON.stringify(forUpdate),this.httpOptions)
    .subscribe( 
      response => {
                    
                    console.log("promenio sam!");
                  },
     error => {
                    
                    
                    console.log("greskica");
                    console.log(error);
                    
                    console.log("probao sam da ubacim");
                    console.log(JSON.stringify(forUpdate));
                    console.log("a treba");
                    console.log(`https://project-heroes-e78cb-default-rtdb.europe-west1.firebasedatabase.app/heroes/`+id);
    });
 
    //console.log("result iz sub-a");
   // console.log(result[1].id);
   //tap(heroes =>{
    //this._heroes.next(heroes);
  //})
   
  });
  
   

  }
  addHeroe (name:string,picture:string,damage:number,health:number){
    let generatedId;

    let newHeroe: HeroeModel;

    return this.authService.userId.pipe(
      take(1),
      switchMap(userId =>{
        newHeroe= new HeroeModel(
          null,
          name,
          picture,
          health,
          damage,
          userId

        );
        return this.http.post<{name:string}>(`https://project-heroes-e78cb-default-rtdb.europe-west1.firebasedatabase.app/heroes.json`,newHeroe);
      }),
      take(1),
      switchMap((resData)=>{
        generatedId=resData.name;
        return this.heroes;
      }),
      take(1),
      tap((heroes)=>{
        newHeroe.id=generatedId;
        this._heroes.next(heroes.concat(newHeroe));
      })
    );

  }

  getHeroes(){
    return this.http.get<{[key:string]:HeroeData}>(`https://project-heroes-e78cb-default-rtdb.europe-west1.firebasedatabase.app/heroes.json`)
    .pipe(map((heroesData)=>{
      const heroes: HeroeModel[]=[];

      for(const key in heroesData){
        if(heroesData.hasOwnProperty(key)){
          heroes.push(new HeroeModel(key,heroesData[key].name,heroesData[key].picture,heroesData[key].health,heroesData[key].damage,heroesData[key].userId));
        }
      }
      
      return heroes;
    }),
      tap(heroes =>{
        this._heroes.next(heroes);
      })
    );
  }


   getHeroe(id:string){//id:string
    
    //iz bh subjecta uzmi po id-u pa ga prosledi u edit heroe ts onda u edit heroe html se pozove
   // console.log("logujem behaviour sub");
   let vrati: HeroeModel;
     this._heroes.asObservable().subscribe(result=>{
      result.forEach(element => {
        if(element.id==id){
         console.log("naso sam nesto");
          
          vrati= element;
          console.log(vrati);
          
        }
      }
      );
      //console.log("result iz sub-a");
     // console.log(result[1].id);
     
    });
    return vrati;
   // console.log(this._heroes[0]);
   // return this._heroes[0];
  
  }

}

