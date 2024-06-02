
export class OrganisationResponse {
    id: string;
    name: string;
    iban: string;
    description: string;
    isApproved: boolean;
    isFeatured: boolean;
    averageRating: number;
    ownerId: string;
    ownerEmail: string;

    constructor(id: string, name: string, iban: string, description: string, isApproved: boolean, averageRating: number,
                isFeatured: boolean, ownerId: string, ownerEmail: string) {
        this.id = id;
        this.name = name;
        this.iban = iban;
        this.description = description;
        this.isApproved = isApproved;
        this.averageRating = averageRating;
        this.isFeatured = isFeatured;
        this.ownerId = ownerId;
        this.ownerEmail = ownerEmail;
    }
}
