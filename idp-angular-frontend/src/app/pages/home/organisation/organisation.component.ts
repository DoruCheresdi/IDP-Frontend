import {Component, OnInit} from '@angular/core';
import {OrganisationService} from "../../../services/organisation.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {OrganisationResponse} from "../../../dtos/organisation-response";
import {AuthService} from "../../../services/auth.service";
import {isNullOrUndefined} from "../../../util/utils";

@Component({
    selector: 'app-organisation',
    templateUrl: './organisation.component.html',
    styleUrls: ['./organisation.component.css']
})
export class OrganisationComponent implements OnInit {

    organisation: OrganisationResponse = {} as OrganisationResponse;

    orgId: string = '';

    isOwner: boolean = false;

    hasFavoritedOrg: boolean = false;

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
        this.orgId = id;
        this.fetchOrganisation();
    }

    private fetchOrganisation() {
        this.organisationService.getOrganisationById(this.orgId).subscribe({
                next: (response: OrganisationResponse) => {
                    this.organisation = response;
                    this.isOwner = this.determineIfIsOwner();
                    this.determineIfHasFavoritedOrg();
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

    addOrgToFavorites() {
        this.organisationService.addOrganisationToFavorites(this.organisation.id).subscribe({
            next: () => {
                this.messageService.add({severity: 'success', summary: 'Success', detail: 'Organisation added to favorites'});
                this.fetchOrganisation();
            },
            error: (error: any) => {
                this.messageService.add({severity: 'error', summary: 'Error', detail: 'Could not add organisation to favorites'});
            }
        });
    }

    removeOrgFromFavorites() {
        this.organisationService.removeOrganisationFromFavorites(this.organisation.id).subscribe({
            next: () => {
                this.messageService.add({severity: 'success', summary: 'Success', detail: 'Organisation removed from favorites'});
                this.fetchOrganisation();
            },
            error: (error: any) => {
                this.messageService.add({severity: 'error', summary: 'Error', detail: 'Could not remove organisation from favorites'});
            }
        });
    }

    determineIfHasFavoritedOrg(): void {
        const userEmail = this.authService.getOwnerEmail();
        this.hasFavoritedOrg = this.organisation.usersThatFavorited.some(user => user.email === userEmail);
    }

    // changePicture(event: any) {
    //     const file = event.target.files[0];
    //     console.log(file);
    //     if (!file) {
    //         this.messageService.add({severity: 'error', summary: 'Error', detail: 'No file selected'});
    //         return;
    //     }
    //
    //     this.organisationService.changeOrganisationPicture(this.organisation.id, file).subscribe({
    //         next: () => {
    //             this.messageService.add({severity: 'success', summary: 'Success', detail: 'Organisation picture changed'});
    //             this.fetchOrganisation();
    //         },
    //         error: (error: any) => {
    //             this.messageService.add({severity: 'error', summary: 'Error', detail: 'Could not change organisation picture'});
    //         }
    //     });
    // }

    getOrganisationImageLink(): string {
        return this.organisationService.getOrganisationImageLink(this.organisation.id, this.organisation.picture);
    }

    getUploadPictureUrl(): string {
        return this.organisationService.getUploadPictureUrl(this.organisation.id);
    }

    afterChangePicture() {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Organisation picture changed'});
        this.fetchOrganisation();
    }

    protected readonly isNullOrUndefined = isNullOrUndefined;
}
