import {Component, OnInit} from '@angular/core';
import {DomainDto} from "../../../../dtos/domain-dto";
import {OrganisationService} from "../../../../services/organisation.service";
import {Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {DomainService} from "../../../../services/domain.service";

@Component({
  selector: 'app-domains-list',
  templateUrl: './domains-list.component.html',
  styleUrls: ['./domains-list.component.css']
})
export class DomainsListComponent implements OnInit {

    public domains: DomainDto[] = [];

    newDomainName: string = '';

    constructor(private organisationService: OrganisationService,
                private router: Router,
                private confirmationService: ConfirmationService,
                private messageService: MessageService,
                private domainService: DomainService) { }

    ngOnInit(): void {
        this.fetchDomains();
    }

    private fetchDomains() {
        this.domainService.getAllDomains().subscribe({
            next: (response: DomainDto[]) => {
                this.domains = response;
            },
            error: (error: any) => {
                this.messageService.add({severity: 'error', summary: 'Error', detail: 'Could not fetch domains'});
            }
        });
    }

    addDomain() {
        if (this.newDomainName === '') {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Domain name cannot be empty'});
            return;
        }
        this.domainService.addDomain(this.newDomainName).subscribe({
            next: (response: any) => {
                this.fetchDomains();
                this.newDomainName = '';
                this.messageService.add({severity: 'success', summary: 'Success', detail: 'Domain added successfully'});
            },
            error: (error: any) => {
                this.messageService.add({severity: 'error', summary: 'Error', detail: 'Could not add domain'});
            }
        });
    }

    removeDomain(domain: DomainDto) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete this domain?',
            accept: () => {
                this.domainService.removeDomain(domain.id).subscribe({
                    next: (response: any) => {
                        this.fetchDomains();
                        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Domain removed successfully'});
                    },
                    error: (error: any) => {
                        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Could not remove domain'});
                    }
                });
            }
        });
    }
}
