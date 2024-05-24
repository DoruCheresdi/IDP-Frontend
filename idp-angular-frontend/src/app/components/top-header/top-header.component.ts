import { Component } from '@angular/core';
import {MenuItem, MenuItemCommandEvent} from "primeng/api";
import {EventService} from "../../services/event.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.css']
})
export class TopHeaderComponent {

    items: MenuItem[] | undefined;

    private LOGIN_LABEL = 'Login';

    private LOGOUT_LABEL = 'Logout';

    private REGISTER_LABEL = 'Register';

    loginItem: MenuItem = {
        label: this.LOGIN_LABEL,
        icon: 'pi pi-fw pi-lock',
        routerLink: '/login'
    }

    logoutItem: MenuItem = {
        label: this.LOGOUT_LABEL,
        icon: 'pi pi-fw pi-lock-open',
        command: () => this.logout()
    }

    registerItem: MenuItem = {
        label: this.REGISTER_LABEL,
        icon: 'pi pi-fw pi-user',
        routerLink: '/register'
    }

    constructor(private eventService: EventService,
                private authService: AuthService) {

    }

    ngOnInit() {
        this.items = [
            this.loginItem,
            this.registerItem
        ];
        this.eventService.logoutEvent.subscribe(() => this.addLoginItemIfNotPresent());
        this.eventService.loginEvent.subscribe(() => this.addLogoutItemIfNotPresent());
    }

    logout() {
        this.authService.logout();
    }

    addLoginItemIfNotPresent() {
        const hasLoginItem = this.items?.some(item => item.label === this.LOGIN_LABEL);
        if (!hasLoginItem) {
            this.items?.push(this.loginItem);
        }

        // check if exists and add register item:
        const hasRegisterItem = this.items?.some(item => item.label === this.REGISTER_LABEL);
        if (!hasRegisterItem) {
            this.items?.push(this.registerItem);
        }

        // remove logout item:
        this.items = this.items?.filter(item => item.label !== this.LOGOUT_LABEL);
    }

    addLogoutItemIfNotPresent() {
        console.log('hello');
        const hasLogoutItem = this.items?.some(item => item.label === this.LOGOUT_LABEL);
        if (!hasLogoutItem) {
            this.items?.push(this.logoutItem);
        }

        // remove login item:
        this.items = this.items?.filter(item => item.label !== this.LOGIN_LABEL);
        // remove register item:
        this.items = this.items?.filter(item => item.label !== this.REGISTER_LABEL);
    }
}
