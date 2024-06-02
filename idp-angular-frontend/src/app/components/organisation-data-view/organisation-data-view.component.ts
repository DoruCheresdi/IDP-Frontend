import {Component, Input} from '@angular/core';
import {OrganisationResponse} from "../../dtos/organisation-response";

@Component({
  selector: 'app-organisation-data-view',
  templateUrl: './organisation-data-view.component.html',
  styleUrls: ['./organisation-data-view.component.css']
})
export class OrganisationDataViewComponent {

    @Input() organisations: OrganisationResponse[] = [];

    constructor() {
    }
}
