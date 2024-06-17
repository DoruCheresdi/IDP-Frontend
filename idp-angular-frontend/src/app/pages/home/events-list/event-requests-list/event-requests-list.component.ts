import {Component, Input} from '@angular/core';
import {VolEventDto} from "../../../../dtos/volEventDto";
import {OrganisationService} from "../../../../services/organisation.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {AuthService} from "../../../../services/auth.service";
import {UserService} from "../../../../services/user.service";
import {DomainService} from "../../../../services/domain.service";
import {UserResponse} from "../../../../dtos/user-response";
import {ReqStatus, VolEventReqDto} from "../../../../dtos/volEventReqDto";
import {VolunteerService} from "../../../../services/volunteer.service";

@Component({
  selector: 'app-event-requests-list',
  templateUrl: './event-requests-list.component.html',
  styleUrls: ['./event-requests-list.component.css']
})
export class EventRequestsListComponent {

    protected readonly ReqStatus = ReqStatus;

    @Input()
    event: VolEventDto = {} as VolEventDto;
    modalVisible: boolean = false;

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
    }

    getProfilePictureLink(volunteer: UserResponse) {
        return this.userService.getProfilePictureLink(volunteer.id, volunteer.profilePicture);
    }

    getCVLink(volunteer: UserResponse) {
        return this.userService.getCVLink(volunteer.id, volunteer.cvPath);
    }

    acceptRequest(request: VolEventReqDto) {

        this.volunteerService.addVolunteerToEvent(this.event.id, request.userId).subscribe(
            () => {
                request.status = ReqStatus.ACCEPTED;
                this.messageService.add({severity: 'success', summary: 'Success', detail: 'Request accepted'});
            },
            error => {
                this.messageService.add({severity: 'error', summary: 'Error', detail: 'Could not accept request'});
            }
        );
    }

    rejectRequest(request: VolEventReqDto) {
        this.volunteerService.rejectEventRequest(request.id).subscribe(
            () => {
                this.event.requests = this.event.requests.filter(req => req.id !== request.id);
                this.messageService.add({severity: 'success', summary: 'Success', detail: 'Request rejected'});
            },
            error => {
                this.messageService.add({severity: 'error', summary: 'Error', detail: 'Could not reject request'});
            }
        );
    }

    getPendingRequestsNumber() {
        return this.event.requests.filter(req => req.status === ReqStatus.PENDING).length;
    }
}
