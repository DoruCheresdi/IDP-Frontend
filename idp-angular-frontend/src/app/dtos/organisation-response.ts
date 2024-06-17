import {UserResponse} from "./user-response";
import {DomainDto} from "./domain-dto";
import {BenefitDto} from "./benefit-dto";

export class OrganisationResponse {
    id: string;
    name: string;
    iban: string;
    description: string;
    isApproved: boolean;
    isFeatured: boolean;
    averageRating: number;
    ownerId: string;
    ownerEmail: string;
    orgLink: string;
    usersThatFavorited: UserResponse[];
    picture: string;
    domains: DomainDto[];
    benefits: BenefitDto[];

    constructor(id: string, name: string, iban: string, description: string, isApproved: boolean, averageRating: number,
                isFeatured: boolean, ownerId: string, ownerEmail: string, orgLink: string, usersThatFavorited: UserResponse[],
                picture: string, domains: DomainDto[], benefits: BenefitDto[]) {
        this.id = id;
        this.name = name;
        this.iban = iban;
        this.description = description;
        this.isApproved = isApproved;
        this.averageRating = averageRating;
        this.isFeatured = isFeatured;
        this.ownerId = ownerId;
        this.ownerEmail = ownerEmail;
        this.orgLink = orgLink;
        this.usersThatFavorited = usersThatFavorited;
        this.picture = picture;
        this.domains = domains;
        this.benefits = benefits;
    }
}
