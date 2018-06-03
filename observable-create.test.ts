import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { cold , hot } from 'jasmine-marbles'
import { from } from 'rxjs/Observable/from';
import { fromPromise } from 'rxjs/Observable/fromPromise';
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

  it('could create from array', () => {
    const stream = from([1, 2 ,3 ,4]);
    expect(stream).toBeObservable(hot('(abcd|)', {a: 1, b: 2, c: 3, d: 4}))
  });

  it('could create from promise', (done) => {
    const promise = Promise.resolve(1);
    const stream = fromPromise(promise);
    promise.then((e) => {
      expect(e).toEqual(1); 
      stream.subscribe((e) => console.log(e), ()=> console.log('error'), () => console.log('complete'));
      done();
    });
  });


});
