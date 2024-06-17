import {UserResponse} from "./user-response";

export class VolEventReqDto {
    id: string;
    userId: string;
    eventId: string;
    status: string;
    volunteer: UserResponse;

    constructor(id: string, userId: string, eventId: string, status: string, volunteer: UserResponse) {
        this.id = id;
        this.userId = userId;
        this.eventId = eventId;
        this.status = status;
        this.volunteer = volunteer;
    }
}
