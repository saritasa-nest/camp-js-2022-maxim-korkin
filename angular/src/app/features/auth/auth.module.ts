import { CommonSharedModule } from 'src/app/shared/common-shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';

import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';

/**
 * Auth form component.
 */
@NgModule({
  declarations: [LoginFormComponent, RegisterFormComponent],
  imports: [CommonModule, CommonSharedModule, AuthRoutingModule],
})
export class AuthModule { }
