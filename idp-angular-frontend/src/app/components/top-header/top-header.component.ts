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

    private FEEDBACK_LABEL = 'Feedback';

    private ORG_LIST_LABEL = 'Organisations';

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

    feedbackItem: MenuItem = {
        label: this.FEEDBACK_LABEL,
        icon: 'pi pi-fw pi-comment',
        routerLink: '/feedback'
    }

    orgListItem: MenuItem = {
        label: this.ORG_LIST_LABEL,
        icon: 'pi pi-fw pi-list',
        routerLink: '/org-list'
    }

    loggedInItems: MenuItem[] = [
        this.logoutItem,
        this.feedbackItem,
        this.orgListItem
    ];

    loogedOutItems: MenuItem[] = [
        this.loginItem,
        this.registerItem
    ]

    constructor(private eventService: EventService,
                private authService: AuthService) {

    }

    ngOnInit() {
        if (this.authService.checkCredentials()) {
            this.items = this.loggedInItems;
        } else {
            this.items = this.loogedOutItems;
        }
        this.eventService.logoutEvent.subscribe(() => this.addLoginItemIfNotPresent());
        this.eventService.loginEvent.subscribe(() => this.addLogoutItemIfNotPresent());
    }

    logout() {
        this.authService.logout();
    }

    addLoginItemIfNotPresent() {
        this.items = this.loogedOutItems;
    }

    addLogoutItemIfNotPresent() {
        this.items = this.loggedInItems;
    }
}
