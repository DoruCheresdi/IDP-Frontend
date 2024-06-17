import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {OrganisationService} from "../../../../services/organisation.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {AuthService} from "../../../../services/auth.service";
import {DomainService} from "../../../../services/domain.service";
import {BenefitService} from "../../../../services/benefit.service";
import {FormBuilder, Validators} from "@angular/forms";
import {BenefitDto} from "../../../../dtos/benefit-dto";

@Component({
  selector: 'app-add-benefit',
  templateUrl: './add-benefit.component.html',
  styleUrls: ['./add-benefit.component.css']
})
export class AddBenefitComponent implements OnInit, OnChanges {

    @Input()
    organisationId = '0';

    @Output()
    addedBenefitEvent = new EventEmitter<any>();

    @Input()
    donation: number = 0;

    addBenefitForm = this.fb.group({
        name: ['', Validators.required],
        subunitaryDescription: ['', Validators.required],
        superunitaryDescription: ['', Validators.required],
        priceInLei: [0, Validators.required]
    });

    showForm = false;

    donationMessage = this.getDonationMessage();

    constructor(private organisationService: OrganisationService,
                private route: ActivatedRoute,
                private router: Router,
                private confirmationService: ConfirmationService,
                private messageService: MessageService,
                private authService: AuthService,
                private domainService: DomainService,
                private fb: FormBuilder,
                private benefitService: BenefitService) { }

    ngOnInit(): void {
        this.addBenefitForm.valueChanges.subscribe(() => {
            this.donationMessage = this.getDonationMessage();
        });
    }

    ngOnChanges(): void {
        this.donationMessage = this.getDonationMessage();
    }

    showFormFields() {
        this.showForm = true;
    }

    addBenefit() {
        if (!this.addBenefitForm.valid) {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Please fill all the fields'});
            return;
        }

        const name = this.addBenefitForm.value.name as string;
        const subunitaryDescription = this.addBenefitForm.value.subunitaryDescription as string;
        const superunitaryDescription = this.addBenefitForm.value.superunitaryDescription as string;
        const priceInLei = this.addBenefitForm.value.priceInLei as number;
        const benefit = new BenefitDto('0', name, subunitaryDescription, this.organisationId,
            superunitaryDescription, priceInLei);

        this.benefitService.addBenefit(benefit).subscribe({
            next: (response: any) => {
                this.messageService.add({severity: 'success', summary: 'Success', detail: 'Benefit added successfully'});
                this.showForm = false;
                this.addBenefitForm.reset();
                this.addedBenefitEvent.emit();
            },
            error: (error: any) => {
                this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to add benefit'});
            }
        });
    }

    getDonationMessage(): string {

        const benefit = new BenefitDto('0',
            this.addBenefitForm.value.name ? this.addBenefitForm.value.name : '',
            this.addBenefitForm.value.subunitaryDescription ? this.addBenefitForm.value.subunitaryDescription : '',
            '0',
            this.addBenefitForm.value.superunitaryDescription ? this.addBenefitForm.value.superunitaryDescription : '',
            this.addBenefitForm.value.priceInLei ? this.addBenefitForm.value.priceInLei : 0);

        return this.benefitService.getBenefitMessage(benefit, this.donation);
    }
}
