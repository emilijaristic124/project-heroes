import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HeroesPageRoutingModule } from './heroes-routing.module';

import { HeroesPage } from './heroes.page';
import { OneHeroeComponent } from '../one-heroe/one-heroe.component';
import { HeroeModalComponent } from './heroe-modal/heroe-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeroesPageRoutingModule
  ],
  declarations: [HeroesPage, OneHeroeComponent,HeroeModalComponent],
  entryComponents:[HeroeModalComponent]
})
export class HeroesPageModule {}
