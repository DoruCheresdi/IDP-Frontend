import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UrlService} from "./url.service";
import {Observable} from "rxjs";
import {OrganisationResponse} from "../dtos/organisation-response";
import {PageResponse} from "../dtos/page-response";

@Injectable({
    providedIn: 'root'
})
export class OrganisationService {

    public getOrganisationsPagedPath = 'organisation/paged';

    public getOrganisationsAllPath = 'organisation/all';

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
}
