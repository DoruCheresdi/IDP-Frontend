import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UrlService} from "./url.service";
import {Observable} from "rxjs";
import {DomainDto} from "../dtos/domain-dto";
import {DomainOrgReqDto} from "../dtos/domain-org-req";
import {DomainUserReqDto} from "../dtos/domain-user-req";

@Injectable({
    providedIn: 'root'
})
export class DomainService {

    public addDomainPath = 'domain';

    public getAllDomainsPath = 'domain/all';

    public addOrgToDomainPath = 'domain/add-org';

    public addUserToDomainPath = 'domain/add-user';

    public removeOrgToDomainPath = 'domain/remove-org';

    public removeUserToDomainPath = 'domain/remove-user';

    constructor(private http: HttpClient,
                private urlService: UrlService) { }

    addDomain(domain: string) {
        const domainDto = {
            name: domain,
            id: '0'
        }
        return this.http.post(this.urlService.getUrl(this.addDomainPath), domainDto);
    }

    getAllDomains(): Observable<DomainDto[]> {
        return this.http.get<DomainDto[]>(this.urlService.getUrl(this.getAllDomainsPath));
    }

    addOrgToDomain(dto: DomainOrgReqDto) {
        return this.http.post(this.urlService.getUrl(this.addOrgToDomainPath), dto);
    }

    removeOrgFromDomain(dto: DomainOrgReqDto) {
        return this.http.post(this.urlService.getUrl(this.removeOrgToDomainPath), dto);
    }

    addUserToDomain(dto: DomainUserReqDto) {
        return this.http.post(this.urlService.getUrl(this.addUserToDomainPath), dto);
    }

    removeUserFromDomain(dto: DomainUserReqDto) {
        return this.http.post(this.urlService.getUrl(this.removeUserToDomainPath), dto);
    }

    removeDomain(domainId: string) {
        return this.http.delete(this.urlService.getUrl(this.addDomainPath) + '/' + domainId);
    }
}
