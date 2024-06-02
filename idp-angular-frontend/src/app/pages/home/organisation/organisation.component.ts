import {Component, OnInit} from '@angular/core';
import {OrganisationService} from "../../../services/organisation.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {OrganisationResponse} from "../../../dtos/organisation-response";

@Component({
  selector: 'app-organisation',
  templateUrl: './organisation.component.html',
  styleUrls: ['./organisation.component.css']
})
export class OrganisationComponent implements OnInit {

    organisation: OrganisationResponse = {} as OrganisationResponse;

    constructor(private organisationService: OrganisationService,
                private route: ActivatedRoute,
                private router: Router,
                private confirmationService: ConfirmationService,
                private messageService: MessageService) {
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
}
