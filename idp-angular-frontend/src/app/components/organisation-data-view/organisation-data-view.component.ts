import {Component, Input, OnChanges, Output} from '@angular/core';
import {OrganisationResponse} from "../../dtos/organisation-response";
import {OrganisationService} from "../../services/organisation.service";
import {Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'app-organisation-data-view',
  templateUrl: './organisation-data-view.component.html',
  styleUrls: ['./organisation-data-view.component.css']
})
export class OrganisationDataViewComponent implements OnChanges {

    @Input() organisations: OrganisationResponse[] = [];

    sortedOrganisations: OrganisationResponse[] = [];

    @Input() header = 'Discover Organisations';

    SORT_BY_RATING = 'By Reviews Rating';
    SORT_BY_DEFAULT = 'Default';
    sortOptions = [this.SORT_BY_RATING, this.SORT_BY_DEFAULT];
    sortKey = this.SORT_BY_DEFAULT;

    constructor(private organisationService: OrganisationService,
                private router: Router,
                private confirmationService: ConfirmationService,
                private messageService: MessageService) {
    }

    ngOnChanges(): void {
        this.sortOrganisations();
    }

    navigateToOrganisation(organisation: OrganisationResponse): void {
        this.router.navigate(['/organisation', organisation.id]);
    }

    getOrganisationPictureUrl(organisation: OrganisationResponse): string {
        return this.organisationService.getOrganisationPictureLink(organisation.id, organisation.picture);
    }

    onSortChange(event: any): void {
        this.sortOrganisations();
    }

    sortOrganisations() {
        if (this.sortKey === this.SORT_BY_RATING) {
            this.sortedOrganisations = [...this.organisations];
            this.sortedOrganisations.sort((a, b) => b.averageRating - a.averageRating);
        } else {
            this.sortedOrganisations = [...this.organisations];
        }
    }

    filterByName(event: any) {
        this.sortOrganisations();
        const orgName = event.target.value.toLowerCase();
        if (!orgName) {
            return;
        }
        this.sortedOrganisations = this.sortedOrganisations
            .filter(organisation => organisation.name.toLowerCase().includes(orgName));
    }
}
