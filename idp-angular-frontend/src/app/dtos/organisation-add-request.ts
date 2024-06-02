export class OrganisationAddRequest {
    name: string;
    orgLink: string;
    description: string;
    constructor(name: string, orgLink: string, description: string) {
        this.name = name;
        this.orgLink = orgLink
        this.description = description;
    }
}
