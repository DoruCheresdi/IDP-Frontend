import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OrganisationService} from "../../../../services/organisation.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {AuthService} from "../../../../services/auth.service";
import {DomainService} from "../../../../services/domain.service";
import {FormBuilder} from "@angular/forms";
import {BenefitService} from "../../../../services/benefit.service";
import {VolunteerService} from "../../../../services/volunteer.service";
import {VolEventDto} from "../../../../dtos/volEventDto";

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

    @Input()
    organisationId = '0';

    @Output()
    addedEvent = new EventEmitter<any>();

    addEventForm = this.fb.group({
        name: [''],
        description: [''],
        location: [''],
        date: [new Date()],
        hours: ['']
    });

    showForm = false;

    constructor(private organisationService: OrganisationService,
                private route: ActivatedRoute,
                private router: Router,
                private confirmationService: ConfirmationService,
                private messageService: MessageService,
                private authService: AuthService,
                private domainService: DomainService,
                private fb: FormBuilder,
                private benefitService: BenefitService,
                private volunteerService: VolunteerService) { }

    ngOnInit(): void {

    }

    showFormFields() {
        this.showForm = true;
    }

    addEvent() {
        const name = this.addEventForm.value.name? this.addEventForm.value.name : '';
        const description = this.addEventForm.value.description? this.addEventForm.value.description : '';
        const location = this.addEventForm.value.location? this.addEventForm.value.location : '';
        const date = this.addEventForm.value.date? this.addEventForm.value.date : new Date();
        const hours = this.addEventForm.value.hours? this.addEventForm.value.hours : '';

        const event = new VolEventDto('0', name, description, date, hours, location,
            [], [], this.organisationId);

        this.volunteerService.addEvent(event).subscribe({
            next: (response: any) => {
                this.addedEvent.emit();
                this.showForm = false;
                this.messageService.add({severity: 'success', summary: 'Success', detail: 'Event added'});
            },
            error: (error: any) => {
                this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to add event'});
            }
        });
    }
}
