import { Observable } from 'rxjs/Observable';
import { getTestScheduler } from 'jasmine-marbles';

export function subscribeToObservable(observable: Observable<any>, delay = 0) {
  getTestScheduler().schedule(() => observable.subscribe(), delay);
  getTestScheduler().flush();
}