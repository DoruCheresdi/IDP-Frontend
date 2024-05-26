export class OrganisationEditRequest {
    name: string;
    iban: string;
    description: string;
    id: string;

    constructor(name: string, iban: string, description: string, id: string) {
        this.name = name;
        this.iban = iban;
        this.description = description;
        this.id = id;
    }
}
