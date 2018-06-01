import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { cold , hot } from 'jasmine-marbles'
import 'jasmine-marbles';

describe('The creatation of Observables', () => {
  
  it('could create an observable', () => {
    const stream = Observable.create((observer: Subscriber<any>) => {
      observer.next(1);
      observer.next(2);
      observer.complete();
    });
    expect(stream).toBeObservable(hot('(ab|)', { a: 1, b: 2}));
  });
});
