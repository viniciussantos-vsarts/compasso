import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {
  constructor() {}

  success(): void {}

  error(err: any): void {
    if (err) {
      new Error('Erro desconhecido');
    }

    new Error(String(err));
  }
}
