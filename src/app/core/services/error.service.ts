import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

    getErrorMessage(error: Error): string {
        const message: any = error.message.split(': ');
        return message[message.length - 1];
    }

}
