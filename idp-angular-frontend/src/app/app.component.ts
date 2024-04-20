import { Component } from '@angular/core';
import {AppService} from "./app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'idp-angular-frontend';
  public organization = "";

  constructor(private service: AppService) { }

  ngOnInit() {
    this.organization = this.service.getOrganization();
  }
}
