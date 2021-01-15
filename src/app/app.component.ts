import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { PageTitle } from 'src/infra/system/constant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private readonly titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle(PageTitle.MAIN);
  }
}
