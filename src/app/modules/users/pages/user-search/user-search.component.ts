import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { PageTitle } from 'src/infra/system/constant';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss'],
})
export class UserSearchComponent implements OnInit {
  constructor(private readonly titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle(PageTitle.USERS);
  }
}
