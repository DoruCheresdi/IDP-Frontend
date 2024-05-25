export class FeedbackCreateReq {
    public comments: string;
    public satisfactionLevelSelect: string;
    public expectationRadioButton: string;
    public improvementsCheckbox: string;

    constructor(comments: string, satisfactionLevelSelect: string, expectationRadioButton: string, improvementsCheckbox: string) {
        this.comments = comments;
        this.satisfactionLevelSelect = satisfactionLevelSelect;
        this.expectationRadioButton = expectationRadioButton;
        this.improvementsCheckbox = improvementsCheckbox;
    }
}
