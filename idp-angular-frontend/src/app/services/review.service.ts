import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UrlService} from "./url.service";
import {ReviewResponse} from "../dtos/review-response";
import {Observable} from "rxjs";
import {ReviewAddRequest} from "../dtos/review-add-request";
import {ReviewEditRequest} from "../dtos/review-edit-request";

@Injectable({
    providedIn: 'root'
})
export class ReviewService {

    public addReviewAllPath = 'review/all';

    public addReviewPath = 'review';

    public editReviewPath = 'review';

    public deleteReviewPath = 'review';

    constructor(private http: HttpClient,
                private urlService: UrlService) { }

    getReviewsAll(): Observable<ReviewResponse[]> {
        return this.http.get<ReviewResponse[]>(this.urlService.getUrl(this.addReviewAllPath));
    }

    addReview(review: ReviewAddRequest): Observable<ReviewResponse> {
        return this.http.post<ReviewResponse>(this.urlService.getUrl(this.addReviewPath), review);
    }

    editReview(review: ReviewEditRequest): Observable<ReviewResponse> {
        return this.http.put<ReviewResponse>(this.urlService.getUrl(this.editReviewPath), review);
    }

    deleteReview(id: string): Observable<any> {
        return this.http.delete<any>(this.urlService.getUrl(this.deleteReviewPath) + '/' + id);
    }
}
