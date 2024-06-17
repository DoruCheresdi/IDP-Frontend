import {Component, OnInit} from '@angular/core';
import {OrganisationResponse} from "../../../dtos/organisation-response";
import {OrganisationService} from "../../../services/organisation.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {VolEventDto} from "../../../dtos/volEventDto";
import {VolunteerService} from "../../../services/volunteer.service";
import {AuthService} from "../../../services/auth.service";

@Component({
    selector: 'app-events-list',
    templateUrl: './events-list.component.html',
    styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {

    organisation: OrganisationResponse = {} as OrganisationResponse;

    events: VolEventDto[] = [];

    isOwner: boolean = false;

    constructor(private organisationService: OrganisationService,
                private route: ActivatedRoute,
                private router: Router,
                private confirmationService: ConfirmationService,
                private messageService: MessageService,
                private volunteerService: VolunteerService,
                private authService: AuthService) {
        // this works only in constructor:
        this.mapOrganisationFromRouteData();
    }

    mapOrganisationFromRouteData() {
        // this works only in constructor:
        const lastRouteData = this.router.getCurrentNavigation()?.extras.state as any;
        const orgToEdit = lastRouteData?.data as OrganisationResponse;
        if (orgToEdit) {
            this.organisation = orgToEdit;
        }
        this.isOwner = this.determineIfIsOwner();
    }

    determineIfIsOwner(): boolean {
        return this.organisation.ownerEmail === this.authService.getOwnerEmail();
    }

    ngOnInit(): void {
        this.fetchEvents();
    }

    fetchEvents() {
        this.volunteerService.getEventsForOrganisation(this.organisation.id).subscribe({
            next: (response: VolEventDto[]) => {
                this.events = response;
            },
            error: (error: any) => {
                this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to fetch events'});
            }
        });
    }

    deleteEvent(event: VolEventDto) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this event?',
            accept: () => {
                this.volunteerService.deleteEvent(event.id).subscribe({
                    next: () => {
                        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Event deleted successfully'});
                        this.fetchEvents();
                    },
                    error: () => {
                        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to delete event'});
                    }
                });
            }
        });
    }

    getEventDateString(event: VolEventDto): string {
        return new Date(event.date).toLocaleDateString();
    }

    showMakeRequestButton(event: VolEventDto): boolean {
        return !this.isOwner && !this.hasUserRequested(event);
    }

    hasUserRequested(event: VolEventDto): boolean {
        return event.requests.some(req => req.volunteer.email === this.authService.getOwnerEmail());
    }

    makeJoinRequestForEvent(event: VolEventDto) {
        this.volunteerService.addEventRequest(event.id).subscribe({
            next: () => {
                this.messageService.add({severity: 'success', summary: 'Success', detail: 'Request sent successfully'});
                this.fetchEvents();
            },
            error: () => {
                this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to send request'});
            }
        });
    }
}
