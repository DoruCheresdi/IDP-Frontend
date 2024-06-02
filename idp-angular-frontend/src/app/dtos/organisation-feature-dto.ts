export class OrganisationFeatureDto {
    id: string;
    isFeatured: boolean;

    constructor(id: string, isFeatured: boolean) {
        this.id = id;
        this.isFeatured = isFeatured;
    }
}
