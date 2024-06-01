export class TokenPayload {
    // from: {
    //   "Role": "ADMIN",
    //   "OwnedOrganisations": [
    //     1,
    //     2,
    //     52,
    //     102,
    //     152,
    //     153
    //   ],
    //   "sub": "admin@mail.com",
    //   "iat": 1717280314,
    //   "exp": 1717366714
    // }

    Role: string;
    OwnedOrganisations: number[];
    sub: string;
    iat: number;
    exp: number;

    constructor(Role: string, OwnedOrganisations: number[], sub: string, iat: number, exp: number) {
        this.Role = Role;
        this.OwnedOrganisations = OwnedOrganisations;
        this.sub = sub;
        this.iat = iat;
        this.exp = exp;
    }
}
