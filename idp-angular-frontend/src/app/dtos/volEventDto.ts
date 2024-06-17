import {UserResponse} from "./user-response";
import {VolEventReqDto} from "./volEventReqDto";

export class VolEventDto {
    id: string;
    name: string;
    description: string;
    date: Date;
    hours: string;
    location: string;
    organisationId: string;
    volunteers: UserResponse[];
    requests: VolEventReqDto[];

    constructor(id: string, name: string, description: string, date: Date, hours: string,
                location: string, volunteers: UserResponse[], requests: VolEventReqDto[], organisationId: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.date = date;
        this.hours = hours;
        this.location = location;
        this.volunteers = volunteers;
        this.requests = requests;
        this.organisationId = organisationId;
    }
}
