import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterFormComponent } from './features/register/register-form/register-form.component';
import { NonAuthGuard } from './core/guards/non-auth.guard';
import { LoginFormComponent } from './features/login/login-form/login-form.component';

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
