import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooComponent } from "./foo.component";
import { HomeComponent } from "./home.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { AuthService } from "./services/auth.service";
import { LoginComponent } from './pages/general/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthBearerInterceptor} from "./services/auth-bearer.interceptor";
import { ButtonModule } from 'primeng/button';
import { TopHeaderComponent } from './components/top-header/top-header.component';
import {MenubarModule} from 'primeng/menubar';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {CardModule} from "primeng/card";
import {InputTextModule} from "primeng/inputtext";
import {PasswordModule} from "primeng/password";
import {provideAnimations} from "@angular/platform-browser/animations";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        FooComponent,
        LoginComponent,
        TopHeaderComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        InputTextModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        ButtonModule,
        NgbModule,
        MenubarModule,
        CardModule,
        PasswordModule
    ],
    providers: [
        AuthService,
        provideAnimations(),
        {provide: HTTP_INTERCEPTORS, useClass: AuthBearerInterceptor, multi:true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
