import { Component } from '@angular/core';
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'idp-angular-frontend';
  public organization = "";

  constructor(private service: AuthService) { }

  ngOnInit() {
  }
}
