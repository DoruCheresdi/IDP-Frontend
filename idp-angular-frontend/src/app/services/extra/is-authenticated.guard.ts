import {CanActivate, CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../auth.service";

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    if (authService.checkCredentials()) {
        console.log('User is authenticated');
        return true;
    } else {
        console.log('User is not authenticated');
        return inject(Router).navigateByUrl('/login');
    }
};
