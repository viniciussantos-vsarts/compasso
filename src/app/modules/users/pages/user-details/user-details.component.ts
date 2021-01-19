import { Component, OnInit } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/infra/services/message.service';

import { PageTitle } from 'src/infra/system/constant';
import { UserReposResponse } from '../../models/user-repos-response.model';
import { UserResponse } from '../../models/user-response.model';
import { UserStarredResponse } from '../../models/user-starred-response.model';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: [
    './user-details.component.scss',
    './../../../../app.component.scss',
  ],
})
export class UserDetailsComponent implements OnInit {
  finishedLoading: boolean | undefined;
  tabFinishedLoading: boolean | undefined;
  user: UserResponse | undefined;
  repos: UserReposResponse[] | undefined;
  starred: UserStarredResponse[] | undefined;
  errorMessage: string | undefined;
  activeTab: string = 'overview';
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(
    private readonly titleService: Title,
    private readonly usersService: UsersService,
    private readonly sanitizer: DomSanitizer,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(PageTitle.USERS);
    const { login } = this.route.snapshot.params;

    this.usersService
      .getUser(login)
      .subscribe(
        (res) => this.success(res),
        (err) => this.messageService.error(err)
      )
      .add(() => (this.finishedLoading = true));
  }

  success(res: UserResponse): void {
    res.avatar_url = this.sanitizer.bypassSecurityTrustUrl(res.avatar_url);
    this.user = res;
    this.titleService.setTitle(`${res.name} - ${PageTitle.MAIN}`);
  }

  getRepos(): void {
    if (this.activeTab !== 'repos') {
      this.currentPage = 1;
      this.activeTab = 'repos';
    }
    this.tabFinishedLoading = false;
    const { login } = this.route.snapshot.params;
    const params: { [key: string]: any } = {
      page: this.currentPage,
      per_page: this.itemsPerPage,
    };
    this.usersService
      .getRepos(login, params)
      .subscribe(
        (res) => this.successGetRepos(res),
        (err) => this.messageService.error(err)
      )
      .add(() => {
        this.tabFinishedLoading = true;
      });
  }

  successGetRepos(res: UserReposResponse[]): void {
    this.repos = res;
  }

  getStarred(): void {
    if (this.activeTab !== 'starred') {
      this.currentPage = 1;
      this.activeTab = 'starred';
    }
    this.tabFinishedLoading = false;
    const { login } = this.route.snapshot.params;
    const params: { [key: string]: any } = {
      page: this.currentPage,
      per_page: this.itemsPerPage,
    };
    this.usersService
      .getStarred(login, params)
      .subscribe(
        (res) => this.successGetStarred(res),
        (err) => this.messageService.error(err)
      )
      .add(() => {
        this.tabFinishedLoading = true;
      });
  }

  successGetStarred(res: UserStarredResponse[]): void {
    this.starred = res;
  }

  onPagination(direction: string, tabActive: string): void {
    if (direction === 'next') {
      this.currentPage++;
    } else {
      this.currentPage--;
    }

    if (this.currentPage < 1) {
      this.currentPage = 1;
    }

    if (tabActive === 'repos') {
      this.getRepos();
    } else {
      this.getStarred();
    }
  }
}
