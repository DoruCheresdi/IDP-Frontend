import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home.component";
import {LoginComponent} from "./pages/general/login/login.component";

// const routes: Routes = [{ path: '', component: HomeComponent, pathMatch: 'full' },
//   {onSameUrlNavigation: 'reload'}];

@NgModule({
    imports: [RouterModule.forRoot([
            { path: '', component: HomeComponent, pathMatch: 'full' },
            { path: 'login', component: LoginComponent }
        ],
        {onSameUrlNavigation: 'reload'})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
