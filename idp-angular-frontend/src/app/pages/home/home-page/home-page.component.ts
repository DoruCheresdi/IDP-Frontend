import {Component, OnInit} from '@angular/core';
import {OrganisationResponse} from "../../../dtos/organisation-response";
import {OrganisationService} from "../../../services/organisation.service";
import {Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

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
        this.organisationService.getOrganisationsAllOrdered().subscribe({
                next: (response: OrganisationResponse[]) => {
                    this.organisations = response;
                },
                error: (error: any) => {
                    this.messageService.add({severity: 'error', summary: 'Error', detail: 'Could not fetch organisations'});
                }
            }
        );
    }

    goToFeaturedOrgs(): void {
        this.router.navigateByUrl('/organisations/featured');
    }

    goToFavoriteOrgs(): void {
        this.router.navigateByUrl('/organisations/favorite');
    }

    goToCreateOrg(): void {
        this.router.navigateByUrl('/organisation/add');
    }
}
