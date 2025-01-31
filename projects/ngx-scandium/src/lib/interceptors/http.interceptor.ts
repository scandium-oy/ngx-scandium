import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { mapHost } from '../services/geocode.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('/assets/i18n')
      || req.url.includes('avoindata.prh.fi')
      || (req.url.includes('/contractors/') && req.method === 'GET')
      || (req.url.includes('/clients/') && req.method === 'GET')
      || (req.url.includes('/users/invite') && req.method === 'POST')
      || (req.url.includes('/signature/passcode') && req.method === 'POST')
      || req.url.startsWith(mapHost)) {
      return next.handle(req);
    }
    return this.authService.getUser().pipe(
      filter((user) => user != null),
      switchMap((user) => from(user?.getIdToken() ?? Promise.resolve('')).pipe(
        switchMap((userToken) => {
          const modifiedReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${userToken}`),
          });
          return next.handle(modifiedReq);
        }),
      )),
    );
  }
}
