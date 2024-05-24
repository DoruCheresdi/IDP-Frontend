import { Component } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    loginForm = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
    });

    constructor(private auth: AuthService,
                private fb: FormBuilder) { }

    login() {

        const email = this.loginForm.controls['email'].value as string;
        const password = this.loginForm.controls['password'].value as string;
        this.auth.authenticate(email, password);
    }
}
