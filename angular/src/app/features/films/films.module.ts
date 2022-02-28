import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonSharedModule } from './../../shared/common-shared.module';
import { FilmsTableComponent } from './films-table/films-table.component';

/**
 * Module for films feature.
 */
@NgModule({
  declarations: [FilmsTableComponent],
  imports: [
    CommonModule,
    CommonSharedModule,
  ],
})
export class FilmsModule { }
