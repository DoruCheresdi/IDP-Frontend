import { Injectable } from '@angular/core';
import {UrlService} from "./url.service";
import {Observable} from "rxjs";
import {TokenResponse} from "../model/token-response";
import {HttpClient} from "@angular/common/http";
import {RegisterRequest} from "../dtos/register-request";
import {UserResponse} from "../dtos/user-response";
import {ChangePasswordDto} from "../pages/user/change-password/change-password-dto";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    public registerPath = 'auth/register';

    public userDataPath = 'user/data';

    public userEditPath = 'user/edit';

    public uploadPicturePath = 'user/upload-profile-picture';

    public uploadCVPath = 'user/upload-cv';

    public notificationsPath = 'user/notifications';

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

    getUploadPictureUrl(): string {
        return this.urlService.getUrl(this.uploadPicturePath);
    }

    getProfilePictureLink(userId: string, profilePicture: string): string {
        return this.urlService.getUrl('assets/user-photos/'+ userId + '/' + profilePicture);
    }

    getUploadCVUrl(): string {
        return this.urlService.getUrl(this.uploadCVPath);
    }

    getCVLink(userId: string, cv: string): string {
        return this.urlService.getUrl('assets/cv/'+ userId + '/' + cv);
    }

    getTaxRedirectionFormLink(): string {
        return this.urlService.getUrl('assets/230_OPANAF_15_2021.pdf');
    }

    getNotifications(): Observable<any> {
        return this.http.get<any>(this.urlService.getUrl(this.notificationsPath));
    }

    changePassword(dto: ChangePasswordDto): Observable<any> {
        return this.http.post<any>(this.urlService.getUrl('user/change-password'), dto);
    }
}
