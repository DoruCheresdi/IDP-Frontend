import {Component, OnInit} from '@angular/core';
import {OrganisationService} from "../../../services/organisation.service";
import {Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {OrganisationResponse} from "../../../dtos/organisation-response";

@Component({
  selector: 'app-featured-organisations',
  templateUrl: './featured-organisations.component.html',
  styleUrls: ['./featured-organisations.component.css']
})
export class FeaturedOrganisationsComponent implements OnInit {

    organisations: OrganisationResponse[] = [];

    constructor(private organisationService: OrganisationService,
                private router: Router,
                private confirmationService: ConfirmationService,
                private messageService: MessageService) {
    }

    ngOnInit(): void {
        this.fetchOrganisations();
    }

    fetchOrganisations(): void {
        this.organisationService.getAllOrganisationsFeatured().subscribe({
                next: (response: OrganisationResponse[]) => {
                    this.organisations = response;
                },
                error: (error: any) => {
                    this.messageService.add({severity: 'error', summary: 'Error', detail: 'Could not fetch organisations'});
                }
            }
        );
    }

}
