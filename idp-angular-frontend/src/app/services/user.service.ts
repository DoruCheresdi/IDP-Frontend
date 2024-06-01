import { Injectable } from '@angular/core';
import {UrlService} from "./url.service";
import {Observable} from "rxjs";
import {TokenResponse} from "../model/token-response";
import {HttpClient} from "@angular/common/http";
import {RegisterRequest} from "../dtos/register-request";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    public registerPath = 'auth/register';

    constructor(private http: HttpClient,
                private urlService: UrlService) { }

    register(email: string, password: string, firstName: string, lastName: string): Observable<any> {
        const request = new RegisterRequest(email, password, firstName, lastName);
        return this.http.post<any>(this.urlService.getUrl(this.registerPath), request);
    }
}
