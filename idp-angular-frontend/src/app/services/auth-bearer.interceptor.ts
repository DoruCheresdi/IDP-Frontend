import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpStatusCode
} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {Cookie} from "ng2-cookies";
import {isNullOrUndefined} from "../util/utils";
import {Router} from "@angular/router";

@Injectable()
export class AuthBearerInterceptor implements HttpInterceptor {

    constructor(private router: Router) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const accessToken = Cookie.get('access_token');

        console.log('intercepted request ... ');
        if (isNullOrUndefined(accessToken)) {
            return next.handle(request);
        }
        console.log('accessToken  ' + accessToken);
        const clonedreq = request.clone({
            headers: request.headers.set(
                'Authorization',
                'Bearer ' + accessToken
            )
        });
        return next.handle(clonedreq).pipe(
            tap({
                    next: succ => {
                    },
                    error: err => {
                        if ([HttpStatusCode.Unauthorized, HttpStatusCode.Forbidden].includes(err.status)) {
                            this.router.navigateByUrl('/login');
                        }
                    }
                }
            )
        );
    }
}
