import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlide, IonSlides, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { HeroeModalComponent } from './heroe-modal/heroe-modal.component';
import { HeroeModel } from './heroe-model';
import { HeroesService } from './heroes.service';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.page.html',
  styleUrls: ['./heroes.page.scss'],
})
export class HeroesPage implements OnInit,OnDestroy {
  heroes: HeroeModel[];
  searchedHeroe: HeroeModel;
  indexNumber: number;
  @ViewChild(IonSlides) slides: IonSlides;

  heroeSub: Subscription;
  constructor(private router: Router, private heroesService: HeroesService,private modalCtrl:ModalController) { 
  //  this.heroes= this.heroesService.heroe;
  }


  ngOnInit() {
   this.heroeSub= this.heroesService.heroes.subscribe((heroes)=>{
      console.log(heroes);


      this.heroes=heroes;
      
    })
  }

  ionViewWillEnter(){
    this.heroesService.getHeroes().subscribe((heroes)=>{
      console.log(heroes);


     // this.heroes=heroes;
    })
  }
  
  async filtered(ev){
    let searchName= ev.srcElement.value;

    if(!searchName){
      return;
    }
    
    let count=0;
    this.heroes.forEach(heroe => {
      
      if (heroe.name.toLowerCase().includes(searchName.toLowerCase())){
        this.searchedHeroe=heroe;
        this.indexNumber=count;
      } else{
        count++;
      }
    });
    
    console.log("heroes");
    console.log(this.heroes);
    console.log("searchedHeroe");
    console.log(this.searchedHeroe);
    console.log("indexNumber");
    console.log(this.indexNumber);
    this.slides.slideTo(this.indexNumber);
    
  }

  openModal(){
    this.modalCtrl.create({
      component:HeroeModalComponent,
      componentProps: {title: "Add heroe"}
    }).then((modal)=>{
      modal.present();
      return modal.onDidDismiss();//prisluskivac
    }).then((resultData)=>{
      if(resultData.role==='confirm'){
        console.log(resultData);
        this.heroesService.addHeroe(resultData.data.heroeData.name,resultData.data.heroeData.picture,resultData.data.heroeData.damage,resultData.data.heroeData.health)
        .subscribe((heroes)=>{
          console.log(heroes);
        //  this.heroes=heroes;
        });
      }
    });
  }
 ngOnDestroy(){
   if(this.heroeSub){
     this.heroeSub.unsubscribe;
   }
 }


}
