import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HeroeModel } from '../heroe-model';
import { HeroesService } from '../heroes.service';

@Component({
  selector: 'app-edit-heroe',
  templateUrl: './edit-heroe.page.html',
  styleUrls: ['./edit-heroe.page.scss'],
})
export class EditHeroePage implements OnInit {

  heroe: HeroeModel;
  constructor(private route:ActivatedRoute, private heroesService: HeroesService,private alertCtrl:AlertController ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap=>{
      console.log("OVO GLEDAM SAD");
    console.log(this.heroesService.getHeroe(paramMap.get("heroeId"))) ;
    this.heroe=this.heroesService.getHeroe(paramMap.get("heroeId"));
     console.log("OVO GLEDAM SAD");
     //ovde treba da ga catchujem
     //console.log(this.heroesService.getHeroe("-Mll1XFbUWgIIdNwdP1d"));
     
    })
  }


  editHeroe(id, name, health, damage, picture){
    this.alertCtrl.create({
      header:"Saving heroe",
      message:"Are you sure you want to edit this heroe?",
      buttons:[
        {
         text:"Save",
         handler: ()=>{
           this.heroesService.editHeroe(id, name, health, damage, picture);
           console.log("ispisujem heroja kojeg treba da zapamtim");
           console.log(id, name.value, health.value, damage.value, picture.value);
           console.log('Editovan heroj :D');
         } 
        },
        {
          text:"Cancel",
          role:"cancel",
          handler:()=>{
            console.log('Heroj nije editovan :(');
          }
        }
      ]

    }).then((alert)=>{
      alert.present();
    })
  }

//  getHeroe(){
 //   this.heroesService.getHeroe();
 // }
  }


