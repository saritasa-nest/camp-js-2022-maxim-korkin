import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonSharedModule } from 'src/app/shared/common-shared.module';

import { RegisterFormComponent } from './register-form/register-form.component';

/**
 * Register module.
 */
@NgModule({
  declarations: [RegisterFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CommonSharedModule,
  ],
})
export class RegisterModule { }
