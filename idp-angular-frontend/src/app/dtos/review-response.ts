export class ReviewResponse {
    id: string;
    stars: number;
    title: string;
    description: string;
    organisationId: string;

    constructor(id: string, stars: number, title: string, description: string, orgId: string) {
        this.id = id;
        this.stars = stars;
        this.title = title;
        this.description = description;
        this.organisationId = orgId;
    }
}
