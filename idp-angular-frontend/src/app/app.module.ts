import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooComponent } from "./foo.component";
import { HomeComponent } from "./home.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { AuthService } from "./services/auth.service";
import { LoginComponent } from './pages/general/login/login.component';
import { FormsModule } from "@angular/forms";
import {AuthBearerInterceptor} from "./services/auth-bearer.interceptor";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        FooComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule
    ],
    providers: [
        AuthService,
        {provide: HTTP_INTERCEPTORS, useClass: AuthBearerInterceptor, multi:true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
