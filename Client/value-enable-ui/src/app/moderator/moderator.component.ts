import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-moderator',
  templateUrl: './moderator.component.html',
  styleUrls: ['./moderator.component.scss'],
})
export class ModeratorComponent implements OnInit {
  loading = false;

  constructor() {}

  ngOnInit() {
    this.loading = true;
  }
}
