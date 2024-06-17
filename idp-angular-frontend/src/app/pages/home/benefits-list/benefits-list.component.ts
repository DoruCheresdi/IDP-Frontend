import {Component, EventEmitter, OnInit} from '@angular/core';
import {OrganisationResponse} from "../../../dtos/organisation-response";
import {OrganisationService} from "../../../services/organisation.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {AuthService} from "../../../services/auth.service";
import {DomainService} from "../../../services/domain.service";
import {BenefitService} from "../../../services/benefit.service";
import {BenefitDto} from "../../../dtos/benefit-dto";

@Component({
    selector: 'app-benefits-list',
    templateUrl: './benefits-list.component.html',
    styleUrls: ['./benefits-list.component.css']
})
export class BenefitsListComponent implements OnInit {

    organisation: OrganisationResponse = {} as OrganisationResponse;

    benefits: BenefitDto[] = [];

    donation: number = 0;

    constructor(private organisationService: OrganisationService,
                private route: ActivatedRoute,
                private router: Router,
                private confirmationService: ConfirmationService,
                private messageService: MessageService,
                private authService: AuthService,
                private domainService: DomainService,
                public benefitService: BenefitService) {
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
    }

    ngOnInit(): void {
        this.fetchBenefits();
    }

    fetchBenefits() {
        this.benefitService.getAllBenefitsByOrg(this.organisation.id).subscribe({
            next: (response: any) => {
                this.benefits = response;
            },
            error: (error: any) => {
                this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to fetch benefits'});
            }
        });
    }

    deleteBenefit(benefit: BenefitDto) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete this benefit?',
            accept: () => {
                this.benefitService.deleteBenefit(benefit.id).subscribe({
                    next: (response: any) => {
                        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Benefit deleted successfully'});
                        this.fetchBenefits();
                    },
                    error: (error: any) => {
                        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to delete benefit'});
                    }
                });
            }
        });
    }
}
