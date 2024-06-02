import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {OrganisationService} from "../../../../services/organisation.service";
import {Router} from "@angular/router";
import {OrganisationAddRequest} from "../../../../dtos/organisation-add-request";
import {OrganisationEditRequest} from "../../../../dtos/organisation-edit-request";
import {OrganisationResponse} from "../../../../dtos/organisation-response";

@Component({
  selector: 'app-edit-organisation',
  templateUrl: './edit-organisation.component.html',
  styleUrls: ['./edit-organisation.component.css']
})
export class EditOrganisationComponent implements OnInit {

    editOrganisationFrom = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        iban: ['', Validators.required],
        id: ['', Validators.required]
    });

    constructor(private organisationService: OrganisationService,
                private fb: FormBuilder,
                private router: Router) {
        // this works only in constructor:
        this.mapOrganisationFromRouteData();
    }

    ngOnInit(): void {
        this.editOrganisationFrom.controls.id.disable();
    }

    mapOrganisationFromRouteData() {
        // this works only in constructor:
        const lastRouteData = this.router.getCurrentNavigation()?.extras.state as any;
        const orgToEdit = lastRouteData?.data as OrganisationResponse;
        if (orgToEdit) {
            this.editOrganisationFrom.controls['id'].setValue(orgToEdit.id);
            this.editOrganisationFrom.controls['name'].setValue(orgToEdit.name);
            this.editOrganisationFrom.controls['description'].setValue(orgToEdit.description);
            this.editOrganisationFrom.controls['iban'].setValue(orgToEdit.iban);
        }
    }

    editOrganisation(): void {
        if (!this.editOrganisationFrom.valid) {
            alert('Invalid Form');
            console.log(this.editOrganisationFrom.errors)
            return;
        }
        const name = this.editOrganisationFrom.controls['name'].value as string;
        const description = this.editOrganisationFrom.controls['description'].value as string;
        const iban = this.editOrganisationFrom.controls['iban'].value as string;
        const id = this.editOrganisationFrom.controls['id'].value as string;

        const orgRequest = new OrganisationEditRequest(name, description, iban, id);
        this.organisationService.editOrganisation(orgRequest).subscribe({
                next: data => this.router.navigateByUrl('/org-list'),
                error: _ => alert('Invalid Request')
            }
        );
    }

}
