import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonSharedModule } from './../../shared/common-shared.module';
import { LoginFormComponent } from './login-form/login-form.component';

/**
 * Login module.
 */
@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CommonSharedModule,
  ],
})
export class LoginModule { }
