import { Component } from '@angular/core';
import {AuthService, Foo} from './services/auth.service'

@Component({
    selector: 'foo-details',
    providers: [AuthService],
    template: `<div class="container">
        <h1 class="col-sm-12">Foo Details</h1>
        <div class="col-sm-12">
            <label class="col-sm-3">ID</label> <span>{{foo.id}}</span>
        </div>
        <div class="col-sm-12">
            <label class="col-sm-3">Name</label> <span>{{foo.name}}</span>
        </div>
        <div class="col-sm-12">
            <button class="btn btn-primary" (click)="getFoo()" type="submit">New Foo</button>
        </div>
    </div>`
})

export class FooComponent {
    public foo = new Foo(1,'sample foo');
    private foosUrl = 'http://localhost:8081/api/foos/';
    private orgUrl = 'http://localhost:8081/organisation';

    constructor(private _service:AuthService) {}

    getFoo(){
        this._service.getResource(this.orgUrl + '/1')
            .subscribe(
                data => this.foo = data);
        this._service.postResource(this.orgUrl, {
            name: "123",
            iban: "fewaf",
            description: "vbsdf"
        })
            .subscribe(
                data => this.foo = data);
    }
}
