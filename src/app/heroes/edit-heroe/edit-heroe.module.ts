import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditHeroePageRoutingModule } from './edit-heroe-routing.module';

import { EditHeroePage } from './edit-heroe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditHeroePageRoutingModule
  ],
  declarations: [EditHeroePage]
})
export class EditHeroePageModule {}
