import {Component, OnInit} from '@angular/core';
import {OrganisationService} from "../../../services/organisation.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {AuthService} from "../../../services/auth.service";
import {UserService} from "../../../services/user.service";
import {UserResponse} from "../../../dtos/user-response";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

    userData: UserResponse = {} as UserResponse;

    constructor(private organisationService: OrganisationService,
                private route: ActivatedRoute,
                private router: Router,
                private confirmationService: ConfirmationService,
                private messageService: MessageService,
                private authService: AuthService,
                private userService: UserService) {
    }

    ngOnInit(): void {
        this.fetchUserData();
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

    goToEditUserInfo() {
    }

    goToChangePassword() {

    }

    changeProfilePicture() {

    }

    uploadCV() {

    }

    downloadCV() {

    }
}
