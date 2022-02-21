import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';

import { LoginFormComponent } from './features/login/login-form/login-form.component';

const routes: Routes = [{ path: 'login', component: LoginFormComponent, canActivate: [AuthGuard] }];

/** App routing module. */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
