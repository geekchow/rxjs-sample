import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { cold , hot } from 'jasmine-marbles'
import { from } from 'rxjs/Observable/from';
import { map, filter, defaultIfEmpty, take, switchMap, combineLatest, pairwise, tap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/Observable/fromPromise';
import { forkJoin } from 'rxjs/Observable/forkJoin';
import 'jasmine-marbles';
import { subscribeToObservable } from './test-utils';

describe('observable operators', () => {
  it('map', () => {
    const origin = cold('-a-b-c-d', { a: 1, b: 2, c: 3, d: 4});
    const newOne = origin.pipe(
      map(e => e*2)
    );
    expect(newOne).toBeObservable(cold('-a-b-c-d', { a: 2, b: 4, c: 6, d: 8}));
  });

  it('filter', () => {
    const origin = cold('-a-b-c-d', { a: 1, b: 2, c: 3, d: 4});
    const newOne = origin.pipe(
      filter((e) => e%2 === 0)
    );
    expect(newOne).toBeObservable(cold('---b---d', { b: 2, d: 4}));

    //
    const newOne2 = origin.pipe(
      filter((e) => e > 5)
    );

    expect(newOne2).toBeObservable(cold(''));
  });

  it('filter2', () => {
        const origin = cold('-a-b-c-d|', { a: 1, b: 2, c: 3, d: 4})
        const newOne3 = origin.pipe(
          filter((e) => e > 5),
          defaultIfEmpty(0)
        );
        expect(newOne3).toBeObservable(cold('--------(m|)', { m: 0}));
  })

  it('take', () => {
    const origin = cold('-a-b-c-d', { a: 1, b: 2, c: 3, d: 4});

    const newOne = origin.pipe(take(1));

    expect(newOne).toBeObservable(hot('-(a|)', {a: 1}));

  });

  it('switchMap', () => {
    const request1 = cold('a----bc', { a: 10, b: 20, c: 30});
    const request2 = cold('a-b-c', { a: 1, b: 2, c: 3});
    const response3 = request1.pipe(
      switchMap(e1 => request2.pipe(
        map(e2=> e1 + e2)
      )));
    expect(response3).toBeObservable(cold('a-b-cde-f-g', { a: 11, b: 12, c: 13, d: 21, e: 31, f: 32, g: 33}));
  })

  it('forkJoin', () => {
      const request1 = cold('a-(b|)', { a: 10, b: 20});
      const request2 = cold('a-(b|)', { a: 1, b: 2});
      const response = forkJoin(
        request1,
        request2
      );
      expect(response).toBeObservable(cold('--(a|)', {a: [20, 2] }));
  });

  it('combineLastest', () => {
    const request1 = cold('a-bc|', { a: 10, b: 20, c: 30});
    const request2 = cold('-a--b|', { a: 1, b: 2});
    const response = request1.pipe(
      combineLatest(request2),
      map(([e1, e2]) => e1 + e2)
    )
    expect(response).toBeObservable(cold('-abcd|', {a: 11, b: 21, c: 31,  d: 32 }));
  });

  it('pairwise', () => {
    const origin = cold('-a-b-c|', { a: 'a', b: 'b', c: 'c'});
    const newOne = origin.pipe(pairwise(), map(([e1, e2]) => e1 + e2));
    expect(newOne).toBeObservable(cold('---a-b|', { a: 'ab', b: 'bc'}));
  })

  it('tap', () => {
    const origin = cold('a-bc|', { a: 10, b: 20, c: 30});
    // const tapFn = (e: any) => console.log('tapFn: ', e);
    const tapFn = jest.fn();
    const newOne = origin.pipe(
      tap((e) => tapFn(e))
    );
    subscribeToObservable(newOne);
    // expect(newOne).toBeObservable(origin);
    expect(tapFn).toHaveBeenCalledTimes(3);
    expect(tapFn).toHaveBeenLastCalledWith(30);
  })
})