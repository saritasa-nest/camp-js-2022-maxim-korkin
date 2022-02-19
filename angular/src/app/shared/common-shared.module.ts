import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

import { NavbarComponent } from './components/navbar/navbar.component';

/**
 * Shared module.
 */
@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, MatToolbarModule],
  exports: [NavbarComponent],
})
export class CommonSharedModule { }
