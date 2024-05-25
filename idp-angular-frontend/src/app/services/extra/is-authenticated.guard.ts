import {CanActivate, CanActivateFn} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../auth.service";

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  return inject(AuthService).checkCredentials();
};
