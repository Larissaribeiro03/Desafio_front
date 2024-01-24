import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor() { }

  message: string = '';
  cpfNotFound: string | null = null;

  add(message: string, isCpfNotFound: boolean = false): void {
    if (isCpfNotFound) {
      this.cpfNotFound = message;
    } else {
      this.message = message;
    }
  }

  clear(){
    this.message = '';
    this.cpfNotFound = '';
  }
}
