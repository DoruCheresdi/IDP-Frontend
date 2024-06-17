export class VolEventReqDto {
    id: string;
    userId: string;
    eventId: string;
    status: string;

    constructor(id: string, userId: string, eventId: string, status: string) {
        this.id = id;
        this.userId = userId;
        this.eventId = eventId;
        this.status = status;
    }
}
