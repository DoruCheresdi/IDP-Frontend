export class ReviewResponse {
    id: string;
    stars: number;
    title: string;
    description: string;
    organisationId: string;
    reviewerEmail: string;
    reviewerName: string;

    constructor(id: string, stars: number, title: string, description: string, orgId: string,
                reviewerEmail: string, reviewerName: string) {
        this.id = id;
        this.stars = stars;
        this.title = title;
        this.description = description;
        this.organisationId = orgId;
        this.reviewerEmail = reviewerEmail;
        this.reviewerName = reviewerName;
    }
}
