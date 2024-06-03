import { Component } from '@angular/core';
import {UserService} from "../../../../services/user.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {OrganisationService} from "../../../../services/organisation.service";
import {OrganisationAddRequest} from "../../../../dtos/organisation-add-request";
import {MessageService} from "primeng/api";

@Component({
    selector: 'app-add-organisation',
    templateUrl: './add-organisation.component.html',
    styleUrls: ['./add-organisation.component.css']
})
export class AddOrganisationComponent {

    addOrganisationFrom = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        orgLink: ['', Validators.required]
    });

    constructor(private organisationService: OrganisationService,
                private fb: FormBuilder,
                private router: Router,
                private messageService: MessageService) { }

    addOrganisation(): void {
        if (!this.addOrganisationFrom.valid) {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Please fill all fields'});
            return;
        }
        const name = this.addOrganisationFrom.controls['name'].value as string;
        const description = this.addOrganisationFrom.controls['description'].value as string;
        const orgLink = this.addOrganisationFrom.controls['orgLink'].value as string;

        const orgRequest = new OrganisationAddRequest(name, orgLink, description);
        this.organisationService.addOrganisation(orgRequest).subscribe({
                next: data => this.router.navigateByUrl('/'),
                error: _ => this.messageService.add({severity: 'error', summary: 'Error', detail: 'Could not add organisation'})
            }
        );
    }
}
