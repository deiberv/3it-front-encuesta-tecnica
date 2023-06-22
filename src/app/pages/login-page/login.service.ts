import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { AuthServerProvider } from "src/app/auth/auth-jwt.service";


export class Login {
  constructor(public email: string, public password: string) {}
}


@Injectable({ providedIn: 'root' })
export class LoginService {

  constructor(
    private authServerProvider: AuthServerProvider
  ) {}

  login(credentials: Login) : Observable<any> {
    return this.authServerProvider.login(credentials);
  }

  logout(): void {
    this.authServerProvider.logout();
  }

  isLoggedIn(): boolean {
    return this.authServerProvider.getToken() !== '';
  }


}
