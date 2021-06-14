import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { RootService } from './root.service';
import { DataI } from './app.models';
import { throttleTime } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor (private rootService: RootService) {
  }
  displayedColumns = ['id', 'int', 'float', 'color','child'];
  timer: number = 1000;
  size: number = 10;
  selectedRadio: string = 'main';
  data$: Observable<DataI[]> | Subject<DataI[]>;
  worker: Worker;

  radioChange() {
    if(this.selectedRadio === 'main') this.useService()
    if(this.selectedRadio === 'worker') this.useWorker()
  }

  ngOnInit () {
    this.useService()
  }
  useWorker() {
    if (this.worker) this.worker.terminate();
    this.worker = new Worker(new URL('./fake-socket.worker', import.meta.url));
    this.data$ = new Subject();
    this.data$ = this.data$.pipe(throttleTime(500));
    this.worker.onmessage = ({ data }) => {
      if( this.data$ instanceof Subject) {
      this.data$.next(data)
      }
    };
    this.worker.postMessage({timer: this.timer, size: this.size});
  }
  useService() {
    if (this.worker) this.worker.terminate()
    this.data$ = this.rootService.data$(this.timer, this.size).pipe(throttleTime(500))
  }

  sliderChange() {
    if(this.selectedRadio === 'main') this.useService()
    if(this.selectedRadio === 'worker') this.useWorker()
  }

}


