import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonSharedModule } from './../../shared/common-shared.module';
import { FilmsTableComponent } from './films-table/films-table.component';
import { PaginationButtonsComponent } from './pagination-buttons/pagination-buttons.component';
import { SearchingInputComponent } from './searching-input/searching-input.component';

/**
 * Module for films feature.
 */
@NgModule({
  declarations: [FilmsTableComponent, PaginationButtonsComponent, SearchingInputComponent],
  imports: [
    CommonModule,
    CommonSharedModule,
  ],
})
export class FilmsModule { }
