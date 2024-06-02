import {Component, OnInit} from '@angular/core';
import {ReviewResponse} from "../../../../dtos/review-response";
import {OrganisationService} from "../../../../services/organisation.service";
import {Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {ReviewService} from "../../../../services/review.service";
import {Table} from "primeng/table";

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {

    reviews: ReviewResponse[] = [];

    reviewsPerPage = 10;

    selectedReview: ReviewResponse | undefined;

    constructor(private reviewService: ReviewService,
                private router: Router,
                private confirmationService: ConfirmationService,
                private messageService: MessageService) {
    }

    ngOnInit(): void {
        this.fetchReviewsAll();
    }

    fetchReviewsAll() {
        this.reviewService.getReviewsAll().subscribe({
                next: (response: ReviewResponse[]) => {
                    this.reviews = response;
                },
                error: (error: any) => {
                    alert(error);
                }
            }
        );
    }

    editRow() {
        this.router.navigateByUrl('/review/edit', {state: {data: this.selectedReview}});
    }

    // addNewRow() {
    //     this.router.navigateByUrl('/add-review');
    // }

    clear(table: Table) {
        table.clear();
    }

    filterTable(event: any, table: Table) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    showDeleteConfirmation() {
        this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.deleteSelectedRow();
            }
        });
    }

    deleteSelectedRow() {
        if (this.selectedReview) {
            this.reviewService.deleteReview(this.selectedReview.id).subscribe({
                next: (response: any) => {
                    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Review deleted successfully'});
                    this.fetchReviewsAll();
                },
                error: (error: any) => {
                    this.messageService.add({severity: 'error', summary: 'Error', detail: 'Review could not be deleted'});
                }
            });
        }
    }
}
