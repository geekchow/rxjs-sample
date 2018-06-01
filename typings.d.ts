declare namespace jest {
  interface Matchers<R> {
    toBeObservable(expected: any): R;
  }
}