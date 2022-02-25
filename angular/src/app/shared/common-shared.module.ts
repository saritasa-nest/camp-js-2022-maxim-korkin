import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './material.module';
import { NavbarComponent } from './components/navbar/navbar.component';

const SHARED_IMPORTS = [
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  MaterialModule,
];

const SHARED_DECLARATIONS = [NavbarComponent];

/**
 * Module for shared components, animations, directives and pipes.
 */
@NgModule({
  declarations: SHARED_DECLARATIONS,
  imports: SHARED_IMPORTS,
  exports: [...SHARED_IMPORTS, ...SHARED_DECLARATIONS],
})

export class CommonSharedModule { }
