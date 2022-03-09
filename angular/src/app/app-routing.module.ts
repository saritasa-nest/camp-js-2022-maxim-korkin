import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NonAuthGuard } from './core/guards/non-auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/films',
    pathMatch: 'full',
  },
  {
    path: 'films',
    loadChildren: () => import('./features/films/films-routing.module').then(m => m.FilmsRoutingModule),
  },
  {
    path: '',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
    canActivate: [NonAuthGuard],
  },
  {
    path: '**',
    redirectTo: 'films',
  },
];

/** App routing module. */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
