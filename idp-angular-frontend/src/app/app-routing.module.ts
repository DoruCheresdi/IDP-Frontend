import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home.component";
import {LoginComponent} from "./pages/general/login/login.component";
import {RegisterComponent} from "./pages/general/register/register.component";
import {FeedbackComponent} from "./pages/general/feedback/feedback.component";
import {isAuthenticatedGuard} from "./services/extra/is-authenticated.guard";
import {isNotAuthenticatedGuard} from "./services/extra/is-not-authenticated.guard";

// const routes: Routes = [{ path: '', component: HomeComponent, pathMatch: 'full' },
//   {onSameUrlNavigation: 'reload'}];

@NgModule({
    imports: [RouterModule.forRoot([
            { path: '', component: HomeComponent, pathMatch: 'full' },
            { path: 'login', component: LoginComponent, canActivate: [isNotAuthenticatedGuard] },
            { path: 'register', component: RegisterComponent, canActivate: [isNotAuthenticatedGuard]},
            { path: 'feedback', component: FeedbackComponent, canActivate: [isAuthenticatedGuard]}
        ],
        {onSameUrlNavigation: 'reload'})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
