import {Component, OnInit} from '@angular/core';
import {OrganisationService} from "../../../services/organisation.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {AuthService} from "../../../services/auth.service";
import {UserService} from "../../../services/user.service";
import {UserResponse} from "../../../dtos/user-response";
import {isNullOrUndefined} from "../../../util/utils";
import {DomainDto} from "../../../dtos/domain-dto";
import {DomainService} from "../../../services/domain.service";
import {DomainUserReqDto} from "../../../dtos/domain-user-req";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

    protected readonly isNullOrUndefined = isNullOrUndefined;

    userData: UserResponse = {} as UserResponse;

    allDomains: DomainDto[] = [];

    selectedDomain: DomainDto = {} as DomainDto;

    constructor(private organisationService: OrganisationService,
                private route: ActivatedRoute,
                private router: Router,
                private confirmationService: ConfirmationService,
                private messageService: MessageService,
                private authService: AuthService,
                private userService: UserService,
                private domainService: DomainService) {
    }

    ngOnInit(): void {
        this.fetchUserData();
        this.fetchAllDomains();
    }

    fetchUserData() {
        this.userService.getCurrentUserData().subscribe({
                next: (response: any) => {
                    this.userData = response;
                },
                error: (error: any) => {
                    this.messageService.add({severity: 'error', summary: 'Error', detail: 'Could not fetch user data'});
                }
            }
        );
    }

    fetchAllDomains() {
        this.domainService.getAllDomains().subscribe({
                next: (response: DomainDto[]) => {
                    this.allDomains = response;
                },
                error: (error: any) => {
                    this.messageService.add({severity: 'error', summary: 'Error', detail: 'Could not fetch domains'});
                }
            }
        );
    }

    goToEditUserInfo() {
        this.router.navigate(['/user-edit']);
    }

    goToChangePassword() {

    }

    removeDomain(domain: DomainDto) {
        const dto = new DomainUserReqDto(this.userData.email, domain.id);
        this.confirmationService.confirm({
            message: 'Are you sure you want to remove this domain?',
            accept: () => {
                this.domainService.removeUserFromDomain(dto).subscribe({
                    next: (response: any) => {
                        this.fetchUserData();
                    },
                    error: (error: any) => {
                        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Could not remove domain'});
                    }
                });
            }
        });
    }

    addDomain(event: any) {
        const dto = new DomainUserReqDto(this.userData.email, this.selectedDomain.id);
        this.domainService.addUserToDomain(dto).subscribe({
            next: (response: any) => {
                this.fetchUserData();
            },
            error: (error: any) => {
                this.messageService.add({severity: 'error', summary: 'Error', detail: 'Could not add domain'});
            }
        });
    }


    filterOutDomains(allDomains: DomainDto[], userDomains: DomainDto[]) {
        return allDomains.filter(domain => !userDomains.some(orgDomain => orgDomain.id === domain.id));
    }

    getUploadPictureUrl() {
        return this.userService.getUploadPictureUrl();
    }

    afterChangePicture() {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Profile picture changed'});
        this.fetchUserData();
    }

    getProfilePictureLink() {
        return this.userService.getProfilePictureLink(this.userData.id, this.userData.profilePicture);
    }

    getUploadCVUrl() {
        return this.userService.getUploadCVUrl();
    }

    afterChangeCV() {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'CV changed'});
        this.fetchUserData();
    }

    getCVLink() {
        return this.userService.getCVLink(this.userData.id, this.userData.cvPath);
    }
}
