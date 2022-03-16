import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { FilmResolver } from 'src/app/core/services/Resolvers/film-resolver.resolver';

import { FilmDetailsComponent } from './film-details/film-details.component';
import { FilmsTableComponent } from './films-table/films-table.component';
import { FilmNotFoundComponent } from './film-not-found/film-not-found.component';
import { NewFilmFormComponent } from './new-film-form/new-film-form.component';

const routes: Routes = [
  {
    path: '',
    component: FilmsTableComponent,
  },
  {
    path: 'new-film',
    component: NewFilmFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'film/:id',
    component: FilmDetailsComponent,
    canActivate: [AuthGuard],
    resolve: {
      film: FilmResolver,
    },
  },
  {
    path: 'film-not-found',
    component: FilmNotFoundComponent,
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
