import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApplicationConfigService } from "../shared/config/application-config.service";
import { Observable } from "rxjs";
import { AuthServerProvider } from "./auth-jwt.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authServerProvider: AuthServerProvider,
    private applicationConfigService: ApplicationConfigService
  ) {}


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const serverApiUrl = this.applicationConfigService.getEndpointFor('');
    if (!request.url || (request.url.startsWith('http') && !(serverApiUrl && request.url.startsWith(serverApiUrl)))) {
      return next.handle(request);
    }

    const token: string | null = this.authServerProvider.getToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(request);
  }



}
