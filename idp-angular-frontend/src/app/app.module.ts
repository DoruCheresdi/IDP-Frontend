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
import {AuthBearerInterceptor} from "./services/extra/auth-bearer.interceptor";
import { ButtonModule } from 'primeng/button';
import { TopHeaderComponent } from './components/top-header/top-header.component';
import {MenubarModule} from 'primeng/menubar';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {CardModule} from "primeng/card";
import {InputTextModule} from "primeng/inputtext";
import {PasswordModule} from "primeng/password";
import {provideAnimations} from "@angular/platform-browser/animations";
import { RegisterComponent } from './pages/general/register/register.component';
import {DividerModule} from "primeng/divider";
import { FeedbackComponent } from './pages/general/feedback/feedback.component';
import { FeedbackDisplayComponent } from './pages/general/feedback/feedback-display/feedback-display.component';
import {DropdownModule} from "primeng/dropdown";
import {RadioButtonModule} from "primeng/radiobutton";
import {CheckboxModule} from "primeng/checkbox";
import {InputTextareaModule} from "primeng/inputtextarea";
import { OrganisationListComponent } from './pages/general/organisations-list/orgainsation-list/organisation-list.component';
import {TableModule} from "primeng/table";
import { AddOrganisationComponent } from './pages/general/organisations-list/add-organisation/add-organisation.component';
import { EditOrganisationComponent } from './pages/general/organisations-list/edit-organisation/edit-organisation.component';
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";
import {ConfirmationService, MessageService} from "primeng/api";
import { ReviewListComponent } from './pages/general/review/review-list/review-list.component';
import { AddReviewComponent } from './pages/general/review/add-review/add-review.component';
import { EditReviewComponent } from './pages/general/review/edit-review/edit-review.component';
import {ChipModule} from "primeng/chip";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        FooComponent,
        LoginComponent,
        TopHeaderComponent,
        RegisterComponent,
        FeedbackComponent,
        FeedbackDisplayComponent,
        OrganisationListComponent,
        AddOrganisationComponent,
        EditOrganisationComponent,
        ReviewListComponent,
        AddReviewComponent,
        EditReviewComponent
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
        PasswordModule,
        DividerModule,
        DropdownModule,
        RadioButtonModule,
        CheckboxModule,
        InputTextareaModule,
        TableModule,
        ConfirmDialogModule,
        ToastModule,
        ChipModule
    ],
    providers: [
        AuthService,
        ConfirmationService,
        MessageService,
        provideAnimations(),
        {provide: HTTP_INTERCEPTORS, useClass: AuthBearerInterceptor, multi:true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
