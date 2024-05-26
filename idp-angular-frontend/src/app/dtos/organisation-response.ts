
export class OrganisationResponse {
    id: number;
    name: string;
    iban: string;
    description: string;

    constructor(id: number, name: string, iban: string, description: string) {
        this.id = id;
        this.name = name;
        this.iban = iban;
        this.description = description;
    }
}
