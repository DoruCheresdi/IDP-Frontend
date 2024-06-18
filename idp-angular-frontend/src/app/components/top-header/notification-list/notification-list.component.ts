import { Component } from '@angular/core';
import {OrganisationService} from "../../../services/organisation.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {AuthService} from "../../../services/auth.service";
import {UserService} from "../../../services/user.service";
import {DomainService} from "../../../services/domain.service";
import {VolunteerService} from "../../../services/volunteer.service";
import {NotificationDto} from "../../../dtos/NotificationDto";

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent {

    modalVisible: boolean = false;

    notifications: NotificationDto[] = [];

    constructor(private organisationService: OrganisationService,
                private route: ActivatedRoute,
                private router: Router,
                private confirmationService: ConfirmationService,
                private messageService: MessageService,
                private authService: AuthService,
                private userService: UserService,
                private domainService: DomainService,
                private volunteerService: VolunteerService) { }

    showDialog() {
        this.modalVisible = true;
        this.fetchNotifications();
    }

    fetchNotifications() {
        this.userService.getNotifications().subscribe(
            notifications => {
                this.notifications = notifications;
            },
            error => {
                this.messageService.add({severity: 'error', summary: 'Error', detail: 'Could not fetch notifications'});
            }
        );
    }
}
