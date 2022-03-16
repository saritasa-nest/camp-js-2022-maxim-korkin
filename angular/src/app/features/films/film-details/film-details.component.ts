import { takeUntil, Subject, map, Observable } from 'rxjs';
import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Film } from 'src/app/core/models/film';

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
    takeUntil(this.destroy$),
    map(data => data['film']),
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

  /**
   * TrackBy function for producers list.
   * @param index - Index.
   * @param producer - Producer.
   */
  public trackProducer(index: number, producer: string): string {
    return producer;
  }

}
