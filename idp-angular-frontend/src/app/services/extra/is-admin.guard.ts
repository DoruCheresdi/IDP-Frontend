import {CanActivateFn} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "../auth.service";

export const isAdminGuard: CanActivateFn = (route, state) => {
    return inject(AuthService).isAdmin();
};
