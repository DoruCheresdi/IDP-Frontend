import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {OrganisationService} from "../../../../services/organisation.service";
import {Router} from "@angular/router";
import {OrganisationAddRequest} from "../../../../dtos/organisation-add-request";
import {OrganisationEditRequest} from "../../../../dtos/organisation-edit-request";
import {OrganisationResponse} from "../../../../dtos/organisation-response";
import {MessageService} from "primeng/api";

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
                private router: Router,
                private messageService: MessageService) {
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
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Please fill all fields'});
            return;
        }
        const name = this.editOrganisationFrom.controls['name'].value as string;
        const description = this.editOrganisationFrom.controls['description'].value as string;
        const iban = this.editOrganisationFrom.controls['iban'].value as string;
        const id = this.editOrganisationFrom.controls['id'].value as string;

        const orgRequest = new OrganisationEditRequest(name, description, iban, id);
        this.organisationService.editOrganisation(orgRequest).subscribe({
                next: data => {
                    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Organisation edited successfully'});
                    console.log('org')
                    this.router.navigateByUrl('/')
                },
                error: _ => this.messageService.add({severity: 'error', summary: 'Error', detail: 'Could not edit organisation'})
            }
        );
    }

}
