import { Component } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


    userForm = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
        password2: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required]
    });

    constructor(private userService: UserService,
                private fb: FormBuilder,
                private router: Router) { }

    register(): void {
        if (!this.userForm.valid) {
            alert('Invalid Form');
            console.log(this.userForm.errors)
            return;
        }

        if (this.userForm.controls['password'].value !== this.userForm.controls['password2'].value) {
            alert('Passwords do not match');
            return;
        }

        const email = this.userForm.controls['email'].value as string;
        const password = this.userForm.controls['password'].value as string;
        const firstName = this.userForm.controls['firstName'].value as string;
        const lastName = this.userForm.controls['lastName'].value as string;

        this.userService.register(email, password, firstName, lastName).subscribe({
                next: data => this.router.navigateByUrl('/login'),
                error: _ => alert('Invalid Request')
            }
        );
    }
}
