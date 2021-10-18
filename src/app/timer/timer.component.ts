import { Component, OnInit, OnDestroy, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})


export class TimerComponent implements OnInit, OnDestroy {
  myDate = new Date();
  _start: boolean = false;
  clock: any;
  minutes: any = '00';
  seconds: any = '00';
  milliseconds: any = '00';

  @Input()
    start: boolean = false;
  @Input()
    showTimerControls: boolean = false;

  constructor() {

  }

  laps: any = [];
  counter: number | undefined;
  timerRef: any;
  running: boolean = false;
  timerText = 'Pause';


  startButton() {
    // const source = timer(0, Date.now());
    // const subscribe = source.subscribe(val => console.log(val));
    this.running = !this.running;
    if (this.running) {
      this.timerText = 'Pause';
      const startTime = Date.now() - (this.counter || 0);
      this.timerRef = setInterval(() => {
        this.counter = Date.now() - startTime;
        this.milliseconds = Math.floor(Math.floor(this.counter % 1000) / 10).toFixed(0);
        this.minutes = Math.floor(this.counter / 60000);
        this.seconds = Math.floor(Math.floor(this.counter % 60000) / 1000).toFixed(0);
        if (Number(this.minutes) < 10) {
          this.minutes = '0' + this.minutes;
        } else {
          this.minutes = '' + this.minutes;
        }
        if (Number(this.milliseconds) < 10) {
          this.milliseconds = '0' + this.milliseconds;
        } else {
          this.milliseconds = '' + this.milliseconds;
        }
        if (Number(this.seconds) < 10) {
          this.seconds = '0' + this.seconds;
        } else {
          this.seconds = '' + this.seconds;
        }
      });
    } else {
        clearInterval(this.timerRef);
        this.running = true;
    }
  }

  pauseButton() {
    if (this.timerText == 'Resume') {
      this.startButton();
    }
    else {
      this.timerText = 'Resume';
      clearInterval(this.timerRef);
      this.running = false;
    }
  }

  stopButton() {
    this.counter = undefined;
    clearInterval(this.timerRef);
    this.running = true;
  }

  addTimerButton() {
    let lapTime = this.minutes + ':' + this.seconds + ':' + this.milliseconds;
    this.laps.push(lapTime);
  }

  clearButton() {
    this.running = false;
    this.timerText = 'Pause';
    this.counter = undefined;
    this.milliseconds = '00',
    this.seconds = '00',
    this.minutes = '00';
    this.laps = [];
    clearInterval(this.timerRef);
  }

  ngOnDestroy() {
    clearInterval(this.timerRef);
  }

  ngOnInit() {
  }
}