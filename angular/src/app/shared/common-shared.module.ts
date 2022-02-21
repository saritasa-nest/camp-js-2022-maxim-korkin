import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './components/navbar/navbar.component';

/**
 * Module for shared components, animations, directives and pipes.
 */
@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, RouterModule, MatToolbarModule],
  exports: [NavbarComponent],
})
export class CommonSharedModule { }
