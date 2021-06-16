import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor
{
  constructor(private oktaAuth: OktaAuthService) {}

  //--------------------------------------------------------------------------
  private async handleAccess(req: HttpRequest<any>, next: HttpHandler): 
    Promise<HttpEvent<any>>
  {
    // wait to get access token
    const accessToken = await this.oktaAuth.getAccessToken();

    //clone the request and add new header with access token
    req = req.clone({
      setHeaders: {
        'Authorization': 'Bearer ' + accessToken,
        'Access-Control-Allow-Origin': '*'
      }
    });

    return next.handle(req).toPromise();
  }
  //--------------------------------------------------------------------------
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
  {
    return from(this.handleAccess(req, next));
  }
}
