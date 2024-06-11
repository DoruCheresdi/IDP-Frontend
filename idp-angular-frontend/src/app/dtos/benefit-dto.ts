export class BenefitDto {
    id: string;
    name: string;
    subunitaryDescription: string;
    superunitaryDescription: string;
    organisationId: string;
    priceInLei: number;

    constructor(id: string, name: string, subunitaryDescription: string, organisationId: string,
                superunitaryDescription: string, priceInLei: number) {
        this.id = id;
        this.name = name;
        this.subunitaryDescription = subunitaryDescription;
        this.organisationId = organisationId;
        this.superunitaryDescription = superunitaryDescription;
        this.priceInLei = priceInLei;
    }
}
