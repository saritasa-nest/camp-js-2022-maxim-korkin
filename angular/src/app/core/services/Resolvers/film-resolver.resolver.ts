import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, catchError, EMPTY } from 'rxjs';

import { Film } from '../../models/film';
import { FilmsService } from '../filmsService/films.service';

/**
 * A resolver to provide a film to the film details page.
 */
@Injectable({
  providedIn: 'root',
})
export class FilmResolver implements Resolve<Film> {

  public constructor(
    private readonly router: Router,
    private readonly filmsService: FilmsService,
  ) { }

  /**
   * @inheritdoc
   */
  public resolve(route: ActivatedRouteSnapshot): Observable<Film> {
    /** Trying to get a film from the navigation state. */
    const state: Film | undefined = this.router.getCurrentNavigation()?.extras.state as Film;
    if (state != null) {
      return of(state);
    }

    /** Otherwise trying to fetch a film and in case of failure navigation to the film not found page. */
    const filmPk = Number(route.paramMap.get('id'));

    /** Checking if the primary key from the route is a number. */
    if (isNaN(filmPk)) {
      return this.handleError();
    }

    return this.filmsService.fetchFilmByPrimaryKey(filmPk).pipe(
      catchError(() => this.handleError()),
    );
  }

  /**
   * Method which redirects to film-not-found page in case of errors occurred during film fetching.
   * @returns Empty stream which need to return from the resolve method in case of errors.
   */
  private handleError(): Observable<never> {
    this.router.navigate(['films/film-not-found']);
    return EMPTY;
  }
}
