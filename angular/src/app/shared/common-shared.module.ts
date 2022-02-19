import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

import { NavbarComponent } from './components/navbar/navbar.component';

/**
 * Module for shared components, animations, directives and pipes.
 */
@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, MatToolbarModule],
  exports: [NavbarComponent],
})
export class CommonSharedModule { }
