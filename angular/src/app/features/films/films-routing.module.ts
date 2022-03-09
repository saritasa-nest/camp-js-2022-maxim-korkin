import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { FilmDetailsComponent } from './film-details/film-details.component';
import { FilmsTableComponent } from './films-table/films-table.component';

const routes: Routes = [
  {
    path: '',
    component: FilmsTableComponent,
  },
  {
    path: 'film/:id',
    component: FilmDetailsComponent,
  },
];

/**
 * Films routing module.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilmsRoutingModule { }
