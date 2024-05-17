import {Component} from '@angular/core';
import {AuthService} from './services/auth.service'
import {Router} from "@angular/router";

@Component({
    selector: 'home-header',
    providers: [AuthService],
  template: `<div class="container" >
    <button *ngIf="!isLoggedIn" class="btn btn-primary" (click)="login()" type="submit">Login</button>
    <div *ngIf="isLoggedIn" class="content">
        <span>Welcome !!</span>
        <a class="btn btn-default pull-right"(click)="logout()" href="#">Logout</a>
        <br/>
        <foo-details></foo-details>
    </div>
</div>`
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
