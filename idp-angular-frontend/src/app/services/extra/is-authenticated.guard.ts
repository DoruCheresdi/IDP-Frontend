import {CanActivate, CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../auth.service";

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    if (authService.checkCredentials()) {
        return true;
    } else {
        return inject(Router).navigateByUrl('/login');
    }
};
