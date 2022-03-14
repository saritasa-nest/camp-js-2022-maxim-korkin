import { FilmsService } from 'src/app/core/services/filmsService/films.service';
import { takeUntil, Subject, map, Observable, switchMap } from 'rxjs';
import { Component, ChangeDetectionStrategy, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Film } from 'src/app/core/models/Film';
import { Character } from 'src/app/core/models/Character';
import { CharactersService } from 'src/app/core/services/CharactersService/characters.service';
import { PlanetsService } from 'src/app/core/services/PlanetsService/planets.service';
import { Planet } from 'src/app/core/models/Planet';
import { MatDialog } from '@angular/material/dialog';

import { FilmDeletionDialogComponent } from './../film-deletion-dialog/film-deletion-dialog.component';

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

  /** Characters. */
  public characters$!: Observable<Character[]>;

  /** Planets. */
  public planets$!: Observable<Planet[]>;

  private readonly destroy$ = new Subject<void>();

  /** Film. */
  public readonly film$: Observable<Film> = this.route.data.pipe(
    takeUntil(this.destroy$),
    map(data => data['film']),
  );

  public constructor(
    private readonly route: ActivatedRoute,
    private readonly filmsService: FilmsService,
    private readonly charactersService: CharactersService,
    private readonly planetsService: PlanetsService,
    private readonly dialogService: MatDialog,
    private readonly router: Router,
  ) {
    this.film$ = this.route.data.pipe(
      takeUntil(this.destroy$),
      map(data => data['film']),
    );
  }

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

  /**
   * Handles delete button click.
   */
  public handleDelete(): void {
    const deletionDialogRef = this.dialogService.open(FilmDeletionDialogComponent);

    deletionDialogRef.afterClosed().subscribe(isConfirmed => {
      /** Checking if the user confirmed deletion. */
      if (isConfirmed) {
        this.film$.pipe(
          switchMap(film => this.filmsService.removeFilmByPrimaryKey(film.pk)),
          takeUntil(this.destroy$),
        ).subscribe({
          next: () => this.router.navigate(['films']),
        });
      }
    });
  }

}
