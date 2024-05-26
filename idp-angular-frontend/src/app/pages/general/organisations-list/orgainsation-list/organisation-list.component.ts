import {Component, OnInit} from '@angular/core';
import {OrganisationResponse} from "../../../../dtos/organisation-response";
import {OrganisationService} from "../../../../services/organisation.service";
import {PageResponse} from "../../../../dtos/page-response";
import {Table} from "primeng/table";
import {Router} from "@angular/router";
import {ConfirmationService, ConfirmEventType, MessageService} from "primeng/api";

@Component({
    selector: 'app-organisation-list',
    templateUrl: './organisation-list.component.html',
    styleUrls: ['./organisation-list.component.css']
})
export class OrganisationListComponent implements OnInit {

    organisations: OrganisationResponse[] = [];

    organisationsPerPage = 10;

    currentPage = 0;

    selectedOrganisation: OrganisationResponse | undefined;

    // lastResponse: PageResponse<OrganisationResponse> | undefined;

    constructor(private organisationService: OrganisationService,
                private router: Router,
                private confirmationService: ConfirmationService,
                private messageService: MessageService) {
    }

    ngOnInit(): void {
        this.currentPage = 0;
        this.fetchOrganisationsAll();
    }

    private fetchOrganisationsPaged() {
        this.organisationService.getOrganisationsPaged(this.currentPage, this.organisationsPerPage).subscribe(
            (response: PageResponse<OrganisationResponse>) => {
                this.organisations = response.content;
                // this.lastResponse = response;
            }
        );
    }

    private fetchOrganisationsAll() {
        this.organisationService.getOrganisationsAll().subscribe({
                next: (response: OrganisationResponse[]) => {
                    this.organisations = response;
                },
                error: (error: any) => {
                    alert(error);
                }
            }
        );
    }

    clear(table: Table) {
        table.clear();
    }

    filterTable(event: any, table: Table) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    showDeleteConfirmation() {
        this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.deleteSelectedRow();
            }
        });
    }

    deleteSelectedRow() {
        if (this.selectedOrganisation) {
            this.organisationService.deleteOrganisation(this.selectedOrganisation.id).subscribe({
                next: (_: any) => {
                    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Organisation deleted successfully'});
                    this.fetchOrganisationsAll();
                },
                error: (_: any) => {
                    this.messageService.add({severity: 'error', summary: 'Error', detail: 'Organisation delete failed'});
                }
            });
        }
    }

    addNewRow() {
        this.router.navigateByUrl('/organisation/add');
    }

    editRow() {
        this.router.navigateByUrl('/organisation/edit', {state: {data: this.selectedOrganisation}});
    }
}
