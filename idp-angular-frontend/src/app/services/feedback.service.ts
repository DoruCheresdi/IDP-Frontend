import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UrlService} from "./url.service";
import {Observable} from "rxjs";
import {RegisterRequest} from "../dtos/register-request";
import {Token} from "../model/token";
import {FeedbackCreateReq} from "../dtos/feedback-create-req";
import {Feedback} from "../model/feedback";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

    public feedbackCreatePath = 'feedback';

    public getLastFeedbackPath = 'feedback/last';

    constructor(private http: HttpClient,
                private urlService: UrlService) { }

    submitFeedback(comments: string,
                   satisfactionLevelSelect: string,
                   expectationRadioButton: string,
                   improvementsCheckbox: string): Observable<any> {
        const request = new FeedbackCreateReq(comments, satisfactionLevelSelect, expectationRadioButton, improvementsCheckbox);
        return this.http.post<Feedback>(this.urlService.getUrl(this.feedbackCreatePath), request);
    }

    getLastFeedback(): Observable<Feedback> {
        return this.http.get<Feedback>(this.urlService.getUrl(this.getLastFeedbackPath));
    }
}
