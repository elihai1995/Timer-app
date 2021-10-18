import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'timer-app';
  myDate = new Date();
  _start: boolean=false;
  constructor(){
  }

  ngOnInit(){
    timer(0, 1000).subscribe(() => {
      this.myDate = new Date()
    }
  )}

  start(){
    this._start=true;
  }
  clear(){
    this._start=false;
  }
}
