import {DomainDto} from "./domain-dto";

export class UserResponse {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    profilePicture: string;
    cvPath: string;
    domains: DomainDto[];

    constructor(id: string, firstname: string, lastname: string, email: string, profilePicture: string,
                cvPath: string, domains: DomainDto[]) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.profilePicture = profilePicture;
        this.cvPath = cvPath;
        this.domains = domains;
    }
}
