export class ReviewAddRequest {
    stars: number;
    title: string;
    description: string;
    organisationId: string;

    constructor(stars: number, title: string, description: string, orgId: string) {
        this.stars = stars;
        this.title = title;
        this.description = description;
        this.organisationId = orgId;
    }
}
