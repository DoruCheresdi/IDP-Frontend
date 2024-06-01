
export class OrganisationResponse {
    id: string;
    name: string;
    iban: string;
    description: string;
    isApproved: boolean;

    constructor(id: string, name: string, iban: string, description: string, isApproved: boolean) {
        this.id = id;
        this.name = name;
        this.iban = iban;
        this.description = description;
        this.isApproved = isApproved;
    }
}
