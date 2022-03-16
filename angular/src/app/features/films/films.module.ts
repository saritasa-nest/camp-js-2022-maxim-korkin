import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonSharedModule } from './../../shared/common-shared.module';
import { FilmsRoutingModule } from './films-routing.module';
import { FilmsTableComponent } from './films-table/films-table.component';
import { PaginationButtonsComponent } from './pagination-buttons/pagination-buttons.component';
import { SearchingInputComponent } from './searching-input/searching-input.component';
import { FilmDetailsComponent } from './film-details/film-details.component';
import { FilmNotFoundComponent } from './film-not-found/film-not-found.component';

/**
 * Module for films feature.
 */
@NgModule({
  declarations: [
    FilmsTableComponent,
    PaginationButtonsComponent,
    SearchingInputComponent,
    FilmDetailsComponent,
    FilmNotFoundComponent,
  ],
  imports: [
    CommonModule,
    CommonSharedModule,
    FilmsRoutingModule,
  ],
})
export class FilmsModule { }
