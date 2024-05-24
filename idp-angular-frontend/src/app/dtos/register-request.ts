
export class RegisterRequest {

    public email: string;
    public password : string;
    public firstName: string;
    public lastName: string;

    constructor(email: string, password: string, firstName: string, lastName: string) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
