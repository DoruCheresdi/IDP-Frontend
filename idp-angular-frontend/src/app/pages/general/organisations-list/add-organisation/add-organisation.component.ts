import { Component } from '@angular/core';
import {UserService} from "../../../../services/user.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {OrganisationService} from "../../../../services/organisation.service";
import {OrganisationAddRequest} from "../../../../dtos/organisation-add-request";

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
                private router: Router) { }

    addOrganisation(): void {
        if (!this.addOrganisationFrom.valid) {
            alert('Invalid Form');
            console.log(this.addOrganisationFrom.errors)
            return;
        }
        const name = this.addOrganisationFrom.controls['name'].value as string;
        const description = this.addOrganisationFrom.controls['description'].value as string;
        const orgLink = this.addOrganisationFrom.controls['orgLink'].value as string;

        const orgRequest = new OrganisationAddRequest(name, orgLink, description);
        this.organisationService.addOrganisation(orgRequest).subscribe({
                next: data => this.router.navigateByUrl('/org-list'),
                error: _ => alert('Invalid Request')
            }
        );
    }
}
