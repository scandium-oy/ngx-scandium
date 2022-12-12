import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Injectable()
export abstract class INavigationService {

  public selected$ = this.router.events.pipe(
    filter((e) => e instanceof NavigationEnd),
    map((_e) => this.router.url.replace('/', '')),
  );

  constructor(
    protected router: Router,
  ) { }

  public abstract navigateToHome(): Promise<boolean>;
  public abstract navigateToLogin(): Promise<boolean>;

  public getUrlTree(path: string) {
    return this.router.parseUrl(path);
  }
}