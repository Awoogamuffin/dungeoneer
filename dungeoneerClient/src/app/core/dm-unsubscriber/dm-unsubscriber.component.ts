import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'dm-unsubscriber',
  templateUrl: './dm-unsubscriber.component.html',
  styleUrls: ['./dm-unsubscriber.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DmUnsubscriberComponent implements OnDestroy {

  unsubscribeAll: Subject<void> = new Subject();

  constructor() { }
  /**
   * Any interface element that may be destroyed inherits from this component. Having the unsubscribe subject call next on ngDestroy
   * ensures that any subscriptions can be ended using pipe(takeUntil(this.unsubscribeAll))
   */

  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
