export class DomainUserReqDto {
    public userEmail: string;
    public domainId: string;

    constructor(userEmail: string, domainId: string) {
        this.userEmail = userEmail;
        this.domainId = domainId;
    }
}
