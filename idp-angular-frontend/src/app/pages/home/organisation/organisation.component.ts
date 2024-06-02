import {Component, OnInit} from '@angular/core';
import {OrganisationService} from "../../../services/organisation.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {OrganisationResponse} from "../../../dtos/organisation-response";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-organisation',
  templateUrl: './organisation.component.html',
  styleUrls: ['./organisation.component.css']
})
export class OrganisationComponent implements OnInit {

    organisation: OrganisationResponse = {} as OrganisationResponse;

    isOwner: boolean = false;

    constructor(private organisationService: OrganisationService,
                private route: ActivatedRoute,
                private router: Router,
                private confirmationService: ConfirmationService,
                private messageService: MessageService,
                private authService: AuthService) {
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id === null) {
            this.showCannotFindOrgError();
            return;
        }
        this.organisationService.getOrganisationById(id).subscribe({
                next: (response: OrganisationResponse) => {
                    this.organisation = response;
                    this.isOwner = this.determineIfIsOwner();
                },
                error: (error: any) => {
                    this.showCannotFindOrgError();
                }
            }
        );
    }

    private showCannotFindOrgError() {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Could not fetch organisation'});
    }

    determineIfIsOwner(): boolean {
        return this.organisation.ownerEmail === this.authService.getOwnerEmail();
    }

    goToEditOrganisation() {
        this.router.navigateByUrl('/organisation/edit', {state: {data: this.organisation}});
    }
}
