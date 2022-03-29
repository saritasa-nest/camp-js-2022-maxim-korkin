import { takeUntil, Subject, map, Observable, tap } from 'rxjs';
import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Film } from 'src/app/core/models/film';
import { assertIsFilm } from 'src/app/core/utils/assert-is-film';

const FILM_DATA = 'film';

/**
 * Component for the film details.
 */
@Component({
  selector: 'sw-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmDetailsComponent implements OnDestroy {

  private readonly destroy$ = new Subject<void>();

  /** Film. */
  public readonly film$: Observable<Film> = this.route.data.pipe(
    map(data => data[FILM_DATA] as Film),
    tap(film => assertIsFilm(film)),
    takeUntil(this.destroy$),
  );

  public constructor(
    private readonly route: ActivatedRoute,
  ) { }

  /**
   * @inheritdoc
   */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
