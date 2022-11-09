import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'fis-wall-in';
  showFiller = false;
  isShowing = false;

  constructor() {}

  ngOnInit(): void {}

  toggleSidenav() {
    this.isShowing = !this.isShowing;
  }

  callMethods() {
    this.toggleSidenav();
  }
}
