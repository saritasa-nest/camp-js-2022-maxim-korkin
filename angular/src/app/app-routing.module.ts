import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FilmsTableComponent } from './features/films/films-table/films-table.component';
import { NonAuthGuard } from './core/guards/non-auth.guard';

const routes: Routes = [
  {
    path: '',
    component: FilmsTableComponent,
  },
  {
    path: '',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
    canActivate: [NonAuthGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

/** App routing module. */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
