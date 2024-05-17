import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UrlService {
    public backendUrl = "http://localhost:8081/";
    public frontendUrl = "http://localhost:8084/";

    constructor() { }

    public getUrl(path: string): string {
        return this.backendUrl + path;
    }
}
