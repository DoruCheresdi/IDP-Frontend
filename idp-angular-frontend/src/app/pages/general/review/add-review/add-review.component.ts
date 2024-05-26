import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ReviewService} from "../../../../services/review.service";
import {ReviewAddRequest} from "../../../../dtos/review-add-request";

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent {

    addReviewForm = this.fb.group({
        stars: [0, Validators.required],
        title: ['', Validators.required],
        description: ['', Validators.required],
        orgId: ['', Validators.required]
    });

    constructor(private reviewService: ReviewService,
                private fb: FormBuilder,
                private router: Router) { }

    addReview(): void {
        if (!this.addReviewForm.valid) {
            alert('Invalid Form');
            console.log(this.addReviewForm.errors)
            return;
        }
        const stars = this.addReviewForm.controls['stars'].value as number;
        const title = this.addReviewForm.controls['title'].value as string;
        const description = this.addReviewForm.controls['description'].value as string;
        const orgId = this.addReviewForm.controls['orgId'].value as string;

        const reviewRequest = new ReviewAddRequest(stars, title, description, orgId);
        this.reviewService.addReview(reviewRequest).subscribe({
                next: data => this.router.navigateByUrl('/review-list'),
                error: _ => alert('Invalid Request')
            }
        );
    }
}
