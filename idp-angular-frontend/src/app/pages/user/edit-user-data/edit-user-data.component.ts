import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {UserEditRequest} from "../../../dtos/user-edit-request";
import {UserResponse} from "../../../dtos/user-response";

@Component({
  selector: 'app-edit-user-data',
  templateUrl: './edit-user-data.component.html',
  styleUrls: ['./edit-user-data.component.css']
})
export class EditUserDataComponent implements OnInit {

    userForm = this.fb.group({
        email: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required]
    });

    constructor(private userService: UserService,
                private fb: FormBuilder,
                private router: Router,
                private messageService: MessageService) { }

    ngOnInit(): void {
        this.fetchUserData();
    }

    fetchUserData() {
        this.userService.getCurrentUserData().subscribe({
                next: (response: UserResponse) => {
                    console.log(response);
                    this.userForm.controls['email'].setValue(response.email);
                    this.userForm.controls['firstName'].setValue(response.firstname);
                    this.userForm.controls['lastName'].setValue(response.lastname);
                },
                error: (error: any) => {
                    this.messageService.add({severity: 'error', summary: 'Error', detail: 'Could not fetch user data'});
                }
            }
        );
    }
    editUserData(): void {
        if (!this.userForm.valid) {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Please fill all fields'});
            return;
        }

        const email = this.userForm.controls['email'].value as string;
        const firstName = this.userForm.controls['firstName'].value as string;
        const lastName = this.userForm.controls['lastName'].value as string;

        const request = new UserEditRequest(email, firstName, lastName);
        this.userService.editUserData(request).subscribe({
                next: data => {
                    this.messageService.add({severity: 'success', summary: 'Success', detail: 'User data edited successfully'});
                    this.router.navigateByUrl('/user-profile')
                },
                error: _ => this.messageService.add({severity: 'error', summary: 'Error', detail: 'Could not edit user data'})
            }
        );
    }

}
