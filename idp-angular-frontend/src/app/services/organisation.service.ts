import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UrlService} from "./url.service";
import {Observable} from "rxjs";
import {OrganisationResponse} from "../dtos/organisation-response";
import {PageResponse} from "../dtos/page-response";
import {OrganisationAddRequest} from "../dtos/organisation-add-request";
import {OrganisationEditRequest} from "../dtos/organisation-edit-request";
import {OrganisationApprovalDto} from "../dtos/organisation-approval-dto";

@Injectable({
    providedIn: 'root'
})
export class OrganisationService {

    public getOrganisationsPagedPath = 'organisation/paged';

    public getOrganisationsAllPath = 'organisation/all';

    public addOrganisationPath = 'organisation';

    public editOrganisationPath = 'organisation';

    public deleteOrganisationPath = 'organisation';

    public approveOrganisationPath = 'organisation/approve';

    constructor(private http: HttpClient,
                private urlService: UrlService) { }

    getOrganisationsPaged(page: number, size: number): Observable<PageResponse<OrganisationResponse>> {
        return this.http.get<PageResponse<OrganisationResponse>>(this.urlService.getUrl(this.getOrganisationsPagedPath), {
            params: {
                page: page.toString(),
                size: size.toString()
            }
        });
    }

    getOrganisationsAll(): Observable<OrganisationResponse[]> {
        return this.http.get<OrganisationResponse[]>(this.urlService.getUrl(this.getOrganisationsAllPath));
    }

    addOrganisation(organisation: OrganisationAddRequest): Observable<OrganisationResponse> {
        return this.http.post<OrganisationResponse>(this.urlService.getUrl(this.addOrganisationPath), organisation);
    }

    editOrganisation(organisation: OrganisationEditRequest): Observable<OrganisationResponse> {
        return this.http.put<OrganisationResponse>(this.urlService.getUrl(this.editOrganisationPath), organisation);
    }

    deleteOrganisation(id: string): Observable<any> {
        return this.http.delete<any>(this.urlService.getUrl(this.deleteOrganisationPath) + '/' + id);
    }

    approveOrganisation(dto: OrganisationApprovalDto): Observable<any> {
        return this.http.post<any>(this.urlService.getUrl(this.approveOrganisationPath), dto);
    }
}
