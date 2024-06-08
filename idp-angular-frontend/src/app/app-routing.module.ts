import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {LoginComponent} from "./pages/general/login/login.component";
import {RegisterComponent} from "./pages/general/register/register.component";
import {FeedbackComponent} from "./pages/general/feedback/feedback.component";
import {isAuthenticatedGuard} from "./services/extra/is-authenticated.guard";
import {isNotAuthenticatedGuard} from "./services/extra/is-not-authenticated.guard";
import {
    OrganisationListComponent
} from "./pages/general/organisations-list/orgainsation-list/organisation-list.component";
import {AddOrganisationComponent} from "./pages/general/organisations-list/add-organisation/add-organisation.component";
import {
    EditOrganisationComponent
} from "./pages/general/organisations-list/edit-organisation/edit-organisation.component";
import {EditReviewComponent} from "./pages/general/review/edit-review/edit-review.component";
import {ReviewListComponent} from "./pages/general/review/review-list/review-list.component";
import {AddReviewComponent} from "./pages/general/review/add-review/add-review.component";
import {HomePageComponent} from "./pages/home/home-page/home-page.component";
import {FavoriteOrganisationsComponent} from "./pages/home/favorite-organisations/favorite-organisations.component";
import {FeaturedOrganisationsComponent} from "./pages/home/featured-organisations/featured-organisations.component";
import {isAdminGuard} from "./services/extra/is-admin.guard";
import {OrganisationComponent} from "./pages/home/organisation/organisation.component";
import {UserProfileComponent} from "./pages/user/user-profile/user-profile.component";
import {EditUserDataComponent} from "./pages/user/edit-user-data/edit-user-data.component";
import {DomainsListComponent} from "./pages/general/domains/domains-list/domains-list.component";

// const routes: Routes = [{ path: '', component: HomeComponent, pathMatch: 'full' },
//   {onSameUrlNavigation: 'reload'}];

@NgModule({
    imports: [RouterModule.forRoot([
            { path: '', component: HomePageComponent, canActivate: [isAuthenticatedGuard] },
            { path: 'login', component: LoginComponent, canActivate: [isNotAuthenticatedGuard] },
            { path: 'register', component: RegisterComponent, canActivate: [isNotAuthenticatedGuard]},
            { path: 'feedback', component: FeedbackComponent, canActivate: [isAuthenticatedGuard]},
            { path: 'org-list', component: OrganisationListComponent, canActivate: [isAdminGuard]},
            { path: 'organisation/add', component: AddOrganisationComponent, canActivate: [isAuthenticatedGuard]},
            { path: 'organisation/edit', component: EditOrganisationComponent, canActivate: [isAuthenticatedGuard]},
            { path: 'review-list', component: ReviewListComponent, canActivate: [isAdminGuard]},
            { path: 'add-review/:id', component: AddReviewComponent, canActivate: [isAuthenticatedGuard]},
            { path: 'review/edit', component: EditReviewComponent, canActivate: [isAuthenticatedGuard]},
            { path: 'organisations/favorite', component: FavoriteOrganisationsComponent, canActivate: [isAuthenticatedGuard]},
            { path: 'organisations/featured', component: FeaturedOrganisationsComponent, canActivate: [isAuthenticatedGuard]},
            { path: 'organisation/:id', component: OrganisationComponent, canActivate: [isAuthenticatedGuard]},
            { path: 'user-profile', component: UserProfileComponent, canActivate: [isAuthenticatedGuard]},
            { path: 'user-edit', component: EditUserDataComponent, canActivate: [isAuthenticatedGuard]},
            { path: 'domains', component: DomainsListComponent, canActivate: [isAdminGuard]},
        ],
        {onSameUrlNavigation: 'reload'})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
