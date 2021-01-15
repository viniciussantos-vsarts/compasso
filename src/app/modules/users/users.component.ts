import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { PageTitle } from 'src/infra/system/constant';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor(private readonly titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle(PageTitle.USERS);
  }
}
