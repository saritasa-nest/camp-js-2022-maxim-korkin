import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { LoginFormComponent } from './login-form/login-form.component';

/**
 * Login module.
 */
@NgModule({
  declarations: [LoginFormComponent],
  imports: [CommonModule, MatFormFieldModule, MatInputModule],
})
export class LoginModule { }
