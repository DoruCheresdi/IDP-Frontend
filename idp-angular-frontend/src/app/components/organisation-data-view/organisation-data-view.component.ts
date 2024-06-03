import {Component, Input} from '@angular/core';
import {OrganisationResponse} from "../../dtos/organisation-response";
import {OrganisationService} from "../../services/organisation.service";
import {Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'app-organisation-data-view',
  templateUrl: './organisation-data-view.component.html',
  styleUrls: ['./organisation-data-view.component.css']
})
export class OrganisationDataViewComponent {

    @Input() organisations: OrganisationResponse[] = [];

    @Input() header = 'Discover Organisations';

    constructor(private organisationService: OrganisationService,
                private router: Router,
                private confirmationService: ConfirmationService,
                private messageService: MessageService) {
    }

    navigateToOrganisation(organisation: OrganisationResponse): void {
        this.router.navigate(['/organisation', organisation.id]);
    }

    getOrganisationPictureUrl(organisation: OrganisationResponse): string {
        return this.organisationService.getOrganisationPictureLink(organisation.id, organisation.picture);
    }
}
