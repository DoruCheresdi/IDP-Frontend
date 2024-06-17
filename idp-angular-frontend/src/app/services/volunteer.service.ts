import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UrlService} from "./url.service";
import {VolEventDto} from "../dtos/volEventDto";

@Injectable({
    providedIn: 'root'
})
export class VolunteerService {

    public getAllEventsByOrganisationPath = 'event/by-organisation';

    public deleteEventPath = 'event';

    public addEventPath = 'event';

    constructor(private http: HttpClient,
                private urlService: UrlService) { }

    getEventsForOrganisation(id: string) {
        return this.http.get<any>(this.urlService.getUrl(this.getAllEventsByOrganisationPath) + '/' + id);
    }

    deleteEvent(id: string) {
        return this.http.delete<any>(this.urlService.getUrl(this.deleteEventPath) + '/' + id);
    }

    addEvent(event: VolEventDto) {
        return this.http.post<any>(this.urlService.getUrl(this.addEventPath), event);
    }
}
