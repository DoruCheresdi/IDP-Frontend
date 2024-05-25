import {Component, Input, OnInit} from '@angular/core';
import {Feedback} from "../../../../model/feedback";

@Component({
  selector: 'app-feedback-display',
  templateUrl: './feedback-display.component.html',
  styleUrls: ['./feedback-display.component.css']
})
export class FeedbackDisplayComponent {

    @Input() feedback: Feedback = new Feedback('', '', '', '', 0);

    @Input() header: string = 'Feedback';

    constructor() { }
}
