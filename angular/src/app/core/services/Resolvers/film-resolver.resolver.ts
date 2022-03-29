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
    const state: Film | undefined = this.router.getCurrentNavigation()?.extras.state as Film;
    if (state != null) {
      return of(state);
    }

    const filmPk = Number(route.paramMap.get('id'));

    if (isNaN(filmPk)) {
      return this.handleError();
    }

    return this.filmsService.fetchFilmByPrimaryKey(filmPk).pipe(
      catchError(() => this.handleError()),
    );
  }

  /**
   * Method which redirects to film-not-found page in case of errors occurred during film fetching.
   * @returns Empty stream.
   */
  private handleError(): Observable<never> {
    this.router.navigate(['films/film-not-found']);
    return EMPTY;
  }
}
