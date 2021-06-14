import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {DataI} from './app.models'
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RootService {

  data$ = (ms: number, size: number): Observable<DataI[]> => {
    return interval(ms).pipe(
      map( _ => this.createDataArray(size)),
      map( arr => arr.splice(arr.length-10))
    )
  }
  createDataArray (size: number) {
    return new Array(size).fill('').map(() => this.data)
  }

  get data ():DataI  {
    return {
      id: String(Math.random()),
      int: Math.floor(Math.random()*564),
      float: Math.random()*4521,
      color: this.randomColor,
      child: {id: String(Math.random()), color: this.randomColor}
    }
  }

  get randomColor() {
    return '#'+Math.floor(Math.random()*16777215).toString(16)
  }

}
