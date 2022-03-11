import { Component, ChangeDetectionStrategy } from '@angular/core';

/**
 * Dialog window for confirmation the film deletion.
 */
@Component({
  selector: 'sw-film-deletion-dialog',
  templateUrl: './film-deletion-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmDeletionDialogComponent {

}
