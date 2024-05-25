import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {FeedbackService} from "../../../services/feedback.service";
import {Feedback} from "../../../model/feedback";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

    lastFeedback: Feedback | undefined = undefined;

    satisfactions = [
        'Very low',
        'Low',
        'Medium',
        'High',
        'Very high'
    ];

    expectations = this.satisfactions;

    improvements = [
        'UI',
        'UX',
        'Performance',
        'Features'
    ];

    constructor(private feedbackService: FeedbackService,
                private fb: FormBuilder,
                private router: Router,
                private auth: AuthService) { }

    feedbackForm = this.fb.group({
        comments: ['', Validators.required],
        satisfactionLevelSelect: ['', Validators.required],
        expectationRadioButton: ['', Validators.required],
        improvementsCheckbox: new FormControl([], Validators.required)
    });

    ngOnInit(): void {
        if (!this.auth.checkCredentials()) {
            return;
        }
        this.feedbackService.getLastFeedback().subscribe({
            next: feedback => this.lastFeedback = feedback
        });
    }

    submitFeedback(): void {

        if (!this.feedbackForm.valid) {
            alert('Invalid Form');
            console.log(this.feedbackForm.errors)
            return;
        }

        const comments = this.feedbackForm.controls['comments'].value as string;
        const satisfactionLevelSelect = this.feedbackForm.controls['satisfactionLevelSelect'].value as string;
        const expectationRadioButton = this.feedbackForm.controls['expectationRadioButton'].value as string;
        const improvementsCheckboxList = this.feedbackForm.controls['improvementsCheckbox'].value as Array<string>;
        const improvementsCheckbox = ''.concat(...improvementsCheckboxList.map(s => s + ', '));

        this.feedbackService.submitFeedback(comments, satisfactionLevelSelect, expectationRadioButton, improvementsCheckbox).subscribe({
                next: feedback => this.lastFeedback = feedback,
                error: _ => alert('Invalid Request')
            }
        );
    }
}
