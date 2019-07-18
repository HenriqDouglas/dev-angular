import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

    getErrorMessage(error: any): string {
        const message: any = error.message.split(': ');
        return message[message.length - 1];
    }

}
