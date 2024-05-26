export class ReviewEditRequest {
    id: string;
    stars: number;
    title: string;
    description: string;

    constructor(stars: number, title: string, description: string, orgId: string) {
        this.stars = stars;
        this.title = title;
        this.description = description;
        this.id = orgId;
    }
}
