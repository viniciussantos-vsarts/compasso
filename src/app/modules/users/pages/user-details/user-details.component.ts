import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { PageTitle } from 'src/infra/system/constant';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  constructor(private readonly titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle(PageTitle.USERS);
  }
}
