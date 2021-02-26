//@ts-nocheck
import { from, fromEvent, Observable, of, merge, throwError } from "rxjs";
import {
  map,
  catchError,
  mergeMap,
  pluck,
  distinctUntilChanged,
} from "rxjs/operators";

const test = new Observable((observer) => {
  try {
    observer.next(1);
    observer.next(2);
  } catch (e) {
    observer.error(e);
  } finally {
    observer.complete();
  }
});

test.subscribe(
  (x) => {
    console.log(x);
  },
  (x) => {
    console.error(x);
  },
  () => {
    console.log("I have been completed");
  }
);
