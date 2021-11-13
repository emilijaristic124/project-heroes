import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditHeroePage } from './edit-heroe.page';

const routes: Routes = [
  {
    path: '',
    component: EditHeroePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditHeroePageRoutingModule {}
