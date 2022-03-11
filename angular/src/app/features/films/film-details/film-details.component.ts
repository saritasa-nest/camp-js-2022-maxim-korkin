import { takeUntil, Subject, map, Observable } from 'rxjs';
import { Component, ChangeDetectionStrategy, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Film } from 'src/app/core/models/Film';
import { Character } from 'src/app/core/models/Character';
import { CharactersService } from 'src/app/core/services/CharactersService/characters.service';
import { PlanetsService } from 'src/app/core/services/PlanetsService/planets.service';
import { Planet } from 'src/app/core/models/Planet';

/**
 * Component for the film details.
 */
@Component({
  selector: 'sw-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmDetailsComponent implements OnInit, OnDestroy {

  private readonly destroy$ = new Subject<void>();

  /** Film. */
  public film$: Observable<Film> = this.route.data.pipe(
    takeUntil(this.destroy$),
    map(data => data['film']),
  );

  /** Characters. */
  public characters$!: Observable<Character[]>;

  /** Planets. */
  public planets$!: Observable<Planet[]>;

  public constructor(
    private readonly route: ActivatedRoute,
    private readonly charactersService: CharactersService,
    private readonly planetsService: PlanetsService,
  ) { }

  /**
   * @inheritdoc
   */
  public ngOnInit(): void {
    this.film$.subscribe(film => {
      this.characters$ = this.charactersService.fetchCharactersByPrimaryKeys(film.characterPks).pipe(
        takeUntil(this.destroy$),
      );
      this.planets$ = this.planetsService.fetchPlanetsByPrimaryKeys(film.planetPks).pipe(
        takeUntil(this.destroy$),
      );
    });
  }

  /**
   * @inheritdoc
   */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
