import {DomainDto} from "./domain-dto";

export class UserResponse {
    firstname: string;
    lastname: string;
    email: string;
    profilePicture: string;
    cvPath: string;
    domains: DomainDto[];

    constructor(firstname: string, lastname: string, email: string, profilePicture: string,
                cvPath: string, domains: DomainDto[]) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.profilePicture = profilePicture;
        this.cvPath = cvPath;
        this.domains = domains;
    }
}
