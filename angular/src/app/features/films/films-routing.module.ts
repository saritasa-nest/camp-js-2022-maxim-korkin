import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

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
    canActivate: [AuthGuard],
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
