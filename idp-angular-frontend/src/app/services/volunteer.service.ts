import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UrlService} from "./url.service";
import {VolEventDto} from "../dtos/volEventDto";


class UserEventDto {
    userId: string;
    eventId: string;

    constructor(userId: string, eventId: string) {
        this.userId = userId;
        this.eventId = eventId;
    }
}

@Injectable({
    providedIn: 'root'
})
export class VolunteerService {

    public getAllEventsByOrganisationPath = 'event/by-organisation';

    public deleteEventPath = 'event';

    public addEventPath = 'event';

    public addEventRequestPath = 'event/add-request';

    public rejectEventRequestPath = 'event/reject-request';

    public addVolunteerToEventPath = 'event/add-volunteer';

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

    addEventRequest(eventId: string) {
        return this.http.post<any>(this.urlService.getUrl(this.addEventRequestPath), eventId);
    }

    rejectEventRequest(requestId: string) {
        return this.http.post<any>(this.urlService.getUrl(this.rejectEventRequestPath), requestId);
    }

    addVolunteerToEvent(eventId: string, userId: string) {
        const dto = new UserEventDto(userId, eventId);
        return this.http.post<any>(this.urlService.getUrl(this.addVolunteerToEventPath), dto);
    }
}
