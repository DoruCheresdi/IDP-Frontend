export class OrganisationApprovalDto {
    id: string;
    isApproved: boolean;

    constructor(id: string, isApproved: boolean) {
        this.id = id;
        this.isApproved = isApproved;
    }
}
