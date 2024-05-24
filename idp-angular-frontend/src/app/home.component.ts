import {Component} from '@angular/core';
import {AuthService} from './services/auth.service'
import {Router} from "@angular/router";

@Component({
    selector: 'home-header',
    providers: [AuthService],
  template: ``
})

export class HomeComponent {
     public isLoggedIn = false;

    constructor(private router: Router,
        private _service:AuthService){}

    ngOnInit(){
        this.isLoggedIn = this._service.checkCredentials();
    }

    login() {
        this.router.navigateByUrl('/login');
    }

    logout() {
        this._service.logout();
    }
}
