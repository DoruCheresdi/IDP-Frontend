import {Injectable} from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, Observable, throwError} from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import {UrlService} from "./url.service";
import {Token} from "../model/token";
import {AuthenticationRequest} from "../dtos/authentication-request";
import {Router} from "@angular/router";

export class Foo {
    constructor(
        public id: number,
        public name: string) { }
}

@Injectable()
export class AuthService {
    public jwtHelper = new JwtHelperService();

    public authenticationPath = 'auth/authenticate';

    constructor(private http: HttpClient, private urlService: UrlService,
                private router: Router){}

    authenticate(email: string, password: string): void {
        const authenticationRequest = new AuthenticationRequest(email, password);

        this.http.post<Token>(this.urlService.getUrl(this.authenticationPath), authenticationRequest)
            .subscribe({
                    next: data => this.successfulAuth(data),
                    error: _ => alert('Invalid Credentials')
                }
            );
    }

    successfulAuth(token: Token){
        this.saveToken(token);
        this.router.navigateByUrl('/');
    }

    saveToken(token: Token){
        Cookie.set("access_token", token.access_token);
        window.location.href = this.urlService.frontendUrl;
    }

    getResource(resourceUrl: any) : Observable<any>{
        return this.http.get(resourceUrl)
            .pipe(catchError((error:any) => throwError( 'Server error')));
    }

    postResource(resourceUrl: any, body: any) : Observable<any>{
        return this.http.post(resourceUrl, body)
            .pipe(catchError((error:any) => throwError( 'Server error')));
    }

    checkCredentials(){
        return Cookie.check('access_token');
    }

    logout() {
        Cookie.delete('access_token');
        window.location.reload();
    }

    // getOrganization(){ -> Get Claim from token
    //     var token = Cookie.get("access_token");
    //
    //     var payload = this.jwtHelper.decodeToken(token);
    //     console.log(payload);
    //     this.organization = payload.organization;
    //     return this.organization;
    // }
}
