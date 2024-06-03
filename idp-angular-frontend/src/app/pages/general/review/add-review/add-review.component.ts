import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ReviewService} from "../../../../services/review.service";
import {ReviewAddRequest} from "../../../../dtos/review-add-request";
import {OrganisationResponse} from "../../../../dtos/organisation-response";
import {OrganisationService} from "../../../../services/organisation.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {

    organisation: OrganisationResponse = {} as OrganisationResponse;

    addReviewForm = this.fb.group({
        stars: [0, Validators.required],
        title: ['', Validators.required],
        description: ['', Validators.required],
        orgId: ['', Validators.required]
    });

    constructor(private reviewService: ReviewService,
                private fb: FormBuilder,
                private router: Router,
                private organisationService: OrganisationService,
                private messageService: MessageService) {
        this.mapOrganisationFromLastRouteData();
    }

    private mapOrganisationFromLastRouteData() {
        const lastRouteData = this.router.getCurrentNavigation()?.extras.state as any;
        this.organisation = lastRouteData?.data as OrganisationResponse;
    }

    ngOnInit(): void {
        this.addReviewForm.controls.orgId.setValue(this.organisation.id);
        this.addReviewForm.controls.orgId.disable();
    }

    addReview(): void {
        if (!this.addReviewForm.valid) {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Please fill all fields'});
            console.log(this.addReviewForm.errors)
            return;
        }
        const stars = this.addReviewForm.controls['stars'].value as number;
        const title = this.addReviewForm.controls['title'].value as string;
        const description = this.addReviewForm.controls['description'].value as string;
        const orgId = this.addReviewForm.controls['orgId'].value as string;

        const reviewRequest = new ReviewAddRequest(stars, title, description, orgId);
        this.reviewService.addReview(reviewRequest).subscribe({
                next: data => this.router.navigateByUrl('/organisation/' + orgId),
                error: _ => this.messageService.add({severity: 'error', summary: 'Error', detail: 'Could not add review'})
            }
        );
    }
}
