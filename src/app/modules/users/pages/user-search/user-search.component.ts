import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer, Title } from '@angular/platform-browser';

import { PageTitle } from 'src/infra/system/constant';
import { UserResponse } from '../../models/user-response.model';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: [
    './user-search.component.scss',
    './../../../../app.component.scss',
  ],
})
export class UserSearchComponent implements OnInit {
  form: FormGroup;
  finishedLoading: boolean | undefined;
  user: UserResponse | undefined;

  constructor(
    private readonly titleService: Title,
    private readonly fb: FormBuilder,
    private readonly usersService: UsersService,
    private readonly sanitizer: DomSanitizer
  ) {
    this.form = this.fb.group({ search: [''] });
  }

  ngOnInit(): void {
    this.titleService.setTitle(PageTitle.USERS);
  }

  onSubmit(): void {
    this.finishedLoading = false;
    const { search } = this.form.value;

    this.usersService
      .getUser(search)
      .subscribe(
        (res) => this.success(res),
        (err) => this.fail(err)
      )
      .add(() => {
        this.form.reset();
        this.finishedLoading = true;
      });
  }

  success(res: UserResponse): void {
    res.avatar_url = this.sanitizer.bypassSecurityTrustUrl(res.avatar_url);
    this.user = res;
  }

  fail(err: any): void {
    this.user = undefined;
  }
}
