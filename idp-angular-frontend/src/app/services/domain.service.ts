import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UrlService} from "./url.service";
import {Observable} from "rxjs";
import {DomainDto} from "../dtos/domain-dto";

@Injectable({
    providedIn: 'root'
})
export class DomainService {

    public addDomainPath = 'domain';

    public getAllDomainsPath = 'domain/all';

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

}
