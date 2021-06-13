import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { RootService } from './root.service';
import { map } from 'rxjs/operators';
import { ThemePalette } from '@angular/material/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor (private rootService: RootService) {}
  displayedColumns = ['id', 'int', 'float', 'color','child'];
  timer: number = 1000;
  size: number = 10;
  data$: any
  worker = new Worker(new URL('./fake-socket.worker', import.meta.url));
  ngOnInit () {
    // this.data$ = this.rootService.data$(this.timer, this.size)
    // .pipe(map( arr => arr.splice(arr.length-10)));
    this.engageWorker()
  }
  engageWorker() {
    if (typeof Worker !== 'undefined') {
      this.worker.onmessage = ({ data }) => {
        this.data$ = of(data)
      };
      this.worker.postMessage({timer: this.timer, size: this.size});
    } else {
      // Web workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
  }


  sliderChange(val: number | null, type: string) {
    if(val === null) return
    if(type === 'timer') this.timer = val
    if(type === 'size') this.size = val
    // this.data$ = this.rootService.data$(this.timer, this.size)
    // .pipe(map( arr => arr.splice(arr.length-10)));
    this.engageWorker()
  }

}


