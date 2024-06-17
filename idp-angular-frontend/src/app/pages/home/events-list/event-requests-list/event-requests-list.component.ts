import {Component, Input} from '@angular/core';
import {VolEventDto} from "../../../../dtos/volEventDto";
import {OrganisationService} from "../../../../services/organisation.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {AuthService} from "../../../../services/auth.service";
import {UserService} from "../../../../services/user.service";
import {DomainService} from "../../../../services/domain.service";
import {UserResponse} from "../../../../dtos/user-response";

@Component({
  selector: 'app-event-requests-list',
  templateUrl: './event-requests-list.component.html',
  styleUrls: ['./event-requests-list.component.css']
})
export class EventRequestsListComponent {

    @Input()
    event: VolEventDto = {} as VolEventDto;
    visible: boolean = false;

    constructor(private organisationService: OrganisationService,
                private route: ActivatedRoute,
                private router: Router,
                private confirmationService: ConfirmationService,
                private messageService: MessageService,
                private authService: AuthService,
                private userService: UserService,
                private domainService: DomainService) { }

    showDialog() {
        this.visible = true;
    }

    getProfilePictureLink(volunteer: UserResponse) {
        return this.userService.getProfilePictureLink(volunteer.id, volunteer.profilePicture);
    }
}
