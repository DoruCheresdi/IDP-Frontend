export class NotificationDto {
    message: string;
    icon: string;

    constructor(text: string, icon: string) {
        this.message = text;
        this.icon = icon;
    }
}
