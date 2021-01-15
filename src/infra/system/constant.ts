import { environment } from './../../environments/environment';

export class BaseApi {
  static readonly github = environment.github;
}

export class Github {
  static readonly USERS = `${BaseApi.github}/users`;
}

export class PageTitle {
  static readonly MAIN = 'Github';
  static readonly USERS = `Usuários - ${PageTitle.MAIN}`;
}
