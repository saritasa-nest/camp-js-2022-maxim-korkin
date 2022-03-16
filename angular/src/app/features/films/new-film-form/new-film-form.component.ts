import { Component, ChangeDetectionStrategy } from '@angular/core';

/**
 * Component for adding new film.
 */
@Component({
  selector: 'sw-new-film-form',
  templateUrl: './new-film-form.component.html',
  styleUrls: ['./new-film-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewFilmFormComponent {

  public constructor() { }

}
