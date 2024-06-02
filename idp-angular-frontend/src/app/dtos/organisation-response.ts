
export class OrganisationResponse {
    id: string;
    name: string;
    iban: string;
    description: string;
    isApproved: boolean;
    averageRating: number;

    constructor(id: string, name: string, iban: string, description: string, isApproved: boolean, averageRating: number) {
        this.id = id;
        this.name = name;
        this.iban = iban;
        this.description = description;
        this.isApproved = isApproved;
        this.averageRating = averageRating;
    }
}
