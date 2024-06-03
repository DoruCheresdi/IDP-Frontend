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

    goToEditReview() {
        const review = this.reviews.find(review => review.reviewerEmail === this.authService.getOwnerEmail());
        this.router.navigate(['/review/edit'], {state: {data: review}});
    }

    deleteReview() {
        // find the review of the user to delete:
        const review = this.reviews.find(review => review.reviewerEmail === this.authService.getOwnerEmail());
        if (!review) {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Could not find review to delete'});
            return;
        }
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete your review?',
            accept: () => {
                this.reviewService.deleteReview(review.id).subscribe({
                        next: _ => {
                            this.messageService.add({severity: 'success', summary: 'Success', detail: 'Review deleted'});
                            this.fetchReviews();
                        },
                        error: _ => {
                            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Could not delete review'});
                        }
                    }
                );
            }
        }); }

    currentUserHasMadeAReview(): boolean {
        return this.reviews.some(review => review.reviewerEmail === this.authService.getOwnerEmail());
    }
}
