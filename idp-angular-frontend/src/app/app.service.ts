import {Injectable} from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, Observable, throwError} from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";

export class Foo {
  constructor(
    public id: number,
    public name: string) { }
}

@Injectable()
export class AppService {
   public jwtHelper = new JwtHelperService();
   public clientId = 'jwtClient';
   public organization = "none";
   public redirectUri = 'http://idp-auth-service:8084/';

  constructor(
    private _http: HttpClient){}

  retrieveToken(code: any){
    let params = new URLSearchParams();
    params.append('grant_type','authorization_code');
    params.append('client_id', this.clientId);
    params.append('client_secret', 'jwtClientSecret');
    params.append('redirect_uri', this.redirectUri);
    params.append('code',code);

    let headers = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'Authorization': 'Basic '+btoa(this.clientId+":secret")});
     this._http.post('http://idp-auth-service:8083/auth/realms/baeldung/protocol/openid-connect/token', params.toString(), { headers: headers })
    .subscribe(
      data => this.saveToken(data),
      err => alert('Invalid Credentials')
    );
  }

  saveToken(token: any){
    var expireDate = new Date().getTime() + (1000 * token.expires_in);
    Cookie.set("access_token", token.access_token, expireDate);
    console.log('Obtained Access token');
    this.getOrganization();
    window.location.href = 'http://idp-auth-service:8084';
  }

  getResource(resourceUrl: any) : Observable<any>{
    var headers = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'Authorization': 'Bearer '+Cookie.get('access_token')});
    return this._http.get(resourceUrl, { headers: headers })
      .pipe(catchError((error:any) => throwError(error.json().error || 'Server error')));
  }

    postResource(resourceUrl: any, body: any) : Observable<any>{
        var headers = new HttpHeaders({ 'Authorization': 'Bearer '+Cookie.get('access_token')});
        return this._http.post(resourceUrl, body, { headers: headers })
            .pipe(catchError((error:any) => throwError(error.json().error || 'Server error')));
    }

  checkCredentials(){
    return Cookie.check('access_token');
  }

  logout() {
    Cookie.delete('access_token');
    window.location.reload();
  }

  getOrganization(){
    	var token = Cookie.get("access_token");

    	var payload = this.jwtHelper.decodeToken(token);
    	console.log(payload);
    	this.organization = payload.organization;
    	return this.organization;
    }
}
