import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-adminnavbar',
  templateUrl: './adminnavbar.component.html',
  styleUrls: ['./adminnavbar.component.css']
})
export class AdminnavbarComponent implements OnInit {
  @Output() logoutClick = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }
  triggerLogoutPopup(): void {
    this.logoutClick.emit(); // Notify app.component to show popup
  }
}
