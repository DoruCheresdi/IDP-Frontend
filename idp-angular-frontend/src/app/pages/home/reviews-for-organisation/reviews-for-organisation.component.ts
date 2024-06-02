import {Component, Input, OnInit} from '@angular/core';
import {OrganisationResponse} from "../../../dtos/organisation-response";
import {OrganisationService} from "../../../services/organisation.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {AuthService} from "../../../services/auth.service";
import {ReviewService} from "../../../services/review.service";
import {ReviewResponse} from "../../../dtos/review-response";

@Component({
  selector: 'app-reviews-for-organisation',
  templateUrl: './reviews-for-organisation.component.html',
  styleUrls: ['./reviews-for-organisation.component.css']
})
export class ReviewsForOrganisationComponent implements OnInit {

    @Input() organisation: OrganisationResponse = {} as OrganisationResponse;

    reviews: ReviewResponse[] = [];

    constructor(private organisationService: OrganisationService,
                private route: ActivatedRoute,
                private router: Router,
                private confirmationService: ConfirmationService,
                private messageService: MessageService,
                private authService: AuthService,
                private reviewService: ReviewService) {
    }

    ngOnInit(): void {
        this.fetchReviews();
    }

    fetchReviews(): void {
        this.reviewService.getReviewsForOrganisation(this.organisation.id).subscribe({
                next: (response: ReviewResponse[]) => {
                    this.reviews = response;
                },
                error: (error: any) => {
                    this.messageService.add({severity: 'error', summary: 'Error', detail: 'Could not fetch reviews'});
                }
            }
        );
    }

    goToAddReview() {
        this.router.navigate(['/add-review', this.organisation.id], {state: {data: this.organisation}});
    }
}
