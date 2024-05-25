export class Feedback {

    public comments: string;
    public satisfactionLevelSelect: string;
    public expectationRadioButton: string;
    public improvementsCheckbox: string;
    public id: number;

    constructor(comments: string, satisfactionLevelSelect: string, expectationRadioButton: string,
                improvementsCheckbox: string, id: number) {
        this.comments = comments;
        this.satisfactionLevelSelect = satisfactionLevelSelect;
        this.expectationRadioButton = expectationRadioButton;
        this.improvementsCheckbox = improvementsCheckbox;
        this.id = id;
    }
}
