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

    private REVIEW_LIST_LABEL = 'Reviews';

    private HOME_LABEL = '';

    private PROFILE_LABEL = 'Profile';

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

    reviewListItem: MenuItem = {
        label: this.REVIEW_LIST_LABEL,
        icon: 'pi pi-fw pi-list',
        routerLink: '/review-list'
    }

    homeItem: MenuItem = {
        label: this.HOME_LABEL,
        icon: 'pi pi-fw pi-home',
        routerLink: '/'
    }

    profileItem: MenuItem = {
        label: this.PROFILE_LABEL,
        icon: 'pi pi-fw pi-user',
        routerLink: '/user-profile'
    }

    adminItems: MenuItem[] = [
        this.orgListItem,
        this.reviewListItem
    ];

    loggedInItems: MenuItem[] = [
        this.homeItem,
        this.logoutItem,
        this.feedbackItem,
        this.profileItem
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
        this.eventService.logoutEvent.subscribe(() => this.addMenuItems());
        this.eventService.loginEvent.subscribe(() => this.addMenuItems());
    }

    logout() {
        this.authService.logout();
    }

    addMenuItems() {
        console.log('check auth ' + this.authService.checkCredentials());
        if (this.authService.checkCredentials()) {
            this.addLogoutItemIfNotPresent();
        } else {
            this.addLoginItemIfNotPresent();
        }
    }
    addLoginItemIfNotPresent() {
        this.items = this.loogedOutItems;
    }

    addLogoutItemIfNotPresent() {
        this.items = this.loggedInItems;
        if (this.authService.isAdmin()) {
            this.items = this.items.concat(this.adminItems);
        }
    }
}
