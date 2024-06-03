export class UserResponse {
    firstname: string;
    lastname: string;
    email: string;
    profilePicture: string;
    cvPath: string;

    constructor(firstname: string, lastname: string, email: string, profilePicture: string, cvPath: string) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.profilePicture = profilePicture;
        this.cvPath = cvPath;
    }
}
