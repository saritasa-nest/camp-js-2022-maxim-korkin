import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Film } from 'src/app/core/models/Film';
import { FilmsService } from 'src/app/core/services/filmsService/films.service';

/**
 * Component for the films table.
 */
@Component({
  selector: 'sw-films-table',
  templateUrl: './films-table.component.html',
  styleUrls: ['./films-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmsTableComponent implements OnInit {

  /** Stream of films. */
  public films$: Observable<Film[]>;

  public constructor(
    private readonly filmsService: FilmsService,
  ) {
    this.films$ = this.filmsService.fetchFilms();
  }

  /**
   * @inheritdoc
   */
  public ngOnInit(): void {
    this.films$.subscribe({
      next: films => console.log(films),
    });
  }
}
