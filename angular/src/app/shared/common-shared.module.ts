import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './material.module';
import { NavbarComponent } from './components/navbar/navbar.component';

/**
 * Module for shared components, animations, directives and pipes.
 */
@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
  ],
  exports: [NavbarComponent, MaterialModule],
})

export class CommonSharedModule { }
