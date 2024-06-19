import { Component } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {ChangePasswordDto} from "./change-password-dto";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

    currentPassword: string = '';

    newPassword: string = '';

    constructor(private userService: UserService,
                private fb: FormBuilder,
                private router: Router,
                private messageService: MessageService) { }

    changePassword() {
        if (this.currentPassword === '' || this.newPassword === '') {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Please fill all fields'});
            return;
        }

        const dto = new ChangePasswordDto(this.currentPassword, this.newPassword, this.newPassword);
        this.userService.changePassword(dto).subscribe({
                next: data => {
                    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Password changed successfully'});
                    this.router.navigateByUrl('/user-profile')
                },
                error: (error: any) => {
                    this.messageService.add({severity: 'error', summary: 'Error', detail: 'Could not change password'});
                }
            }
        );
    }
}
