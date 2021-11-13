import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeroesPage } from './heroes.page';

const routes: Routes = [
  {
    path: '',
    component: HeroesPage
  },
  {
    path: ':heroeId',
    loadChildren: () => import('./edit-heroe/edit-heroe.module').then( m => m.EditHeroePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeroesPageRoutingModule {}
