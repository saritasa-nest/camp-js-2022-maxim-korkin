import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NonAuthGuard } from './core/guards/non-auth.guard';
import { LoginFormComponent } from './features/auth/login-form/login-form.component';
import { RegisterFormComponent } from './features/auth/register-form/register-form.component';

const routes: Routes = [
  { path: 'login', component: LoginFormComponent, canActivate: [NonAuthGuard] },

  { path: 'register', component: RegisterFormComponent, canActivate: [NonAuthGuard] },
];

/** App routing module. */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
