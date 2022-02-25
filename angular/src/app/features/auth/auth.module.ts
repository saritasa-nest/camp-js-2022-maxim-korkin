import { CommonSharedModule } from 'src/app/shared/common-shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';

import { AuthFormComponent } from './auth-form/auth-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';

/**
 * Auth module.
 */
@NgModule({
  declarations: [AuthFormComponent, LoginFormComponent, RegisterFormComponent],
  imports: [CommonModule, CommonSharedModule, AuthRoutingModule],
})
export class AuthModule { }
