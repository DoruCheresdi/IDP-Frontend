import {Component, OnInit} from '@angular/core';
import {OrganisationResponse} from "../../../dtos/organisation-response";
import {OrganisationService} from "../../../services/organisation.service";
import {Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'app-favorite-organisations',
  templateUrl: './favorite-organisations.component.html',
  styleUrls: ['./favorite-organisations.component.css']
})
export class FavoriteOrganisationsComponent implements OnInit {

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
        this.organisationService.getAllFavoriteOrganisations().subscribe({
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
