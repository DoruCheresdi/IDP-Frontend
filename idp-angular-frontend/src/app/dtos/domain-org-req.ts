export class DomainOrgReqDto {
    public orgId: string;
    public domainId: string;

    constructor(orgId: string, domainId: string) {
        this.orgId = orgId;
        this.domainId = domainId;
    }
}
