import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UrlService} from "./url.service";
import {BenefitDto} from "../dtos/benefit-dto";

@Injectable({
    providedIn: 'root'
})
export class BenefitService {

    public addBenefitPath = 'benefit';

    public getBenefitPath = 'benefit';

    public deleteBenefitPath = 'benefit';

    public getAllBenefitsByOrgPath = 'benefit/get-all-by-org';

    constructor(private http: HttpClient,
                private urlService: UrlService) { }

    addBenefit(benefit: BenefitDto) {
        return this.http.post(this.urlService.getUrl(this.addBenefitPath), benefit);
    }

    getBenefit(id: string) {
        return this.http.get(this.urlService.getUrl(this.getBenefitPath) + '/' + id);
    }

    deleteBenefit(id: string) {
        return this.http.delete(this.urlService.getUrl(this.deleteBenefitPath) + '/' + id);
    }

    getAllBenefitsByOrg(orgId: string) {
        return this.http.get(this.urlService.getUrl(this.getAllBenefitsByOrgPath) + '/' + orgId);
    }

    getBenefitMessage(benefit: BenefitDto, donation: number): string {
        if (donation > benefit.priceInLei) {
            let qty = 0;
            if (benefit.priceInLei !== 0) {
                qty = donation / benefit.priceInLei;
            }
            return "Your donation will pay for " + (qty).toFixed(2) + " " + benefit.superunitaryDescription;
        } else {
            let fraction = 0;
            if (benefit.priceInLei !== 0) {
                fraction = donation * 100 / benefit.priceInLei;
            }
            return "Your donation will pay for " + (fraction).toFixed(2) + "% " + benefit.subunitaryDescription;
        }
    }
}
