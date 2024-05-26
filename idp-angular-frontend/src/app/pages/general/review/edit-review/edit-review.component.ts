import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ReviewService} from "../../../../services/review.service";
import {ReviewEditRequest} from "../../../../dtos/review-edit-request";

@Component({
  selector: 'app-edit-review',
  templateUrl: './edit-review.component.html',
  styleUrls: ['./edit-review.component.css']
})
export class EditReviewComponent implements OnInit {


    editReviewFrom = this.fb.group({
        stars: [0, Validators.required],
        title: ['', Validators.required],
        description: ['', Validators.required],
        id: ['', Validators.required]
    });
    constructor(private reviewService: ReviewService,
                private fb: FormBuilder,
                private router: Router) {
        // this works only in constructor:
        this.mapReviewFromRouteData();
    }

    ngOnInit(): void {
        this.editReviewFrom.controls.id.disable();
    }

    mapReviewFromRouteData() {
        const lastRouteData = this.router.getCurrentNavigation()?.extras.state as any;
        const reviewToEdit = lastRouteData?.data as any;
        if (reviewToEdit) {
            this.editReviewFrom.controls['id'].setValue(reviewToEdit.id);
            this.editReviewFrom.controls['stars'].setValue(reviewToEdit.stars);
            this.editReviewFrom.controls['title'].setValue(reviewToEdit.title);
            this.editReviewFrom.controls['description'].setValue(reviewToEdit.description);
        }
    }

    editReview(): void {
        if (!this.editReviewFrom.valid) {
            alert('Invalid Form');
            console.log(this.editReviewFrom.errors)
            return;
        }
        const stars = this.editReviewFrom.controls['stars'].value as number;
        const title = this.editReviewFrom.controls['title'].value as string;
        const description = this.editReviewFrom.controls['description'].value as string;
        const id = this.editReviewFrom.controls['id'].value as string;

        const reviewRequest = new ReviewEditRequest(stars, title, description, id);
        this.reviewService.editReview(reviewRequest).subscribe({
                next: data => this.router.navigateByUrl('/review-list'),
                error: _ => alert('Invalid Request')
            }
        );
    }
}
