import {Component, OnInit} from '@angular/core';
import {OrganisationResponse} from "../../../../dtos/organisation-response";
import {OrganisationService} from "../../../../services/organisation.service";
import {PageResponse} from "../../../../dtos/page-response";
import {Table} from "primeng/table";

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

    constructor(private organisationService: OrganisationService) {
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

    deleteSelectedRow() {
        console.log(this.selectedOrganisation);
    }
}
