import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Github } from 'src/infra/system/constant';
import { UserResponse } from '../models/user-response.model';
import { UserReposResponse } from '../models/user-repos-response.model';
import { UserStarredResponse } from '../models/user-starred-response.model';

@Injectable()
export class UsersService {
  constructor(private readonly http: HttpClient) {}

  getUser(login: string): Observable<UserResponse> {
    return this.http
      .get<UserResponse>(`${Github.USERS}/${login}`)
      .pipe(take(1));
  }

  getRepos(
    login: string,
    params?: { [key: string]: any }
  ): Observable<UserReposResponse[]> {
    return this.http
      .get<UserReposResponse[]>(`${Github.USERS}/${login}/repos`, { params })
      .pipe(take(1));
  }

  getStarred(
    login: string,
    params?: { [key: string]: any }
  ): Observable<UserStarredResponse[]> {
    return this.http
      .get<UserStarredResponse[]>(`${Github.USERS}/${login}/starred`, {
        params,
      })
      .pipe(take(1));
  }
}
