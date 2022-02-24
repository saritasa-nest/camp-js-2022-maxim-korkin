import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthFormComponent } from '../features/auth/auth-form/auth-form.component';

import { MaterialModule } from './material.module';
import { NavbarComponent } from './components/navbar/navbar.component';

/**
 * Module for shared components, animations, directives and pipes.
 */
@NgModule({
  declarations: [NavbarComponent, AuthFormComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [
    NavbarComponent,
    AuthFormComponent,
    MaterialModule,
  ],
})

export class CommonSharedModule { }
