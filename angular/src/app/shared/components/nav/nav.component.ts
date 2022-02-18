/* eslint-disable no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
// Temporary
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

/**
 *
 */
@Component({
  selector: 'sw-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent implements OnInit {

  public constructor() { }

  /**
   * @inheritdoc
   */
  public ngOnInit(): void {
  }

}
