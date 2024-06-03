import { Injectable } from '@angular/core';
import {UrlService} from "./url.service";
import {Observable} from "rxjs";
import {TokenResponse} from "../model/token-response";
import {HttpClient} from "@angular/common/http";
import {RegisterRequest} from "../dtos/register-request";
import {UserResponse} from "../dtos/user-response";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    public registerPath = 'auth/register';

    public userDataPath = 'user/data';

    public userEditPath = 'user/edit';

    constructor(private http: HttpClient,
                private urlService: UrlService) { }

    register(email: string, password: string, firstName: string, lastName: string): Observable<any> {
        const request = new RegisterRequest(email, password, firstName, lastName);
        return this.http.post<any>(this.urlService.getUrl(this.registerPath), request);
    }

    getCurrentUserData(): Observable<UserResponse> {
        return this.http.get<any>(this.urlService.getUrl(this.userDataPath));
    }

    editUserData(request: any): Observable<any> {
        return this.http.put<any>(this.urlService.getUrl(this.userEditPath), request);
    }

}
