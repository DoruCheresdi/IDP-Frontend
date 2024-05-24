import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor() { }

    loginEvent = new EventEmitter;
    logoutEvent = new EventEmitter;
}
