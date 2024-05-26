export class OrganisationAddRequest {
    name: string;
    iban: string;
    description: string;
    constructor(name: string, iban: string, description: string) {
        this.name = name;
        this.iban = iban;
        this.description = description;
    }
}
