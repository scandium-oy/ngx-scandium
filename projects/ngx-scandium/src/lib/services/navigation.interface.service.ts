import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

export abstract class INavigationService {

  selected$ = this.router.events.pipe(
    filter((e) => e instanceof NavigationEnd),
    map((_e) => this.router.url.replace('/', '')),
  );

  constructor(
    private router: Router,
  ) { }

  public abstract navigateToHome(): Promise<boolean>;
  public abstract navigateToLogin(): Promise<boolean>;

  public getUrlTree(path: string) {
    return this.router.parseUrl(path);
  }
}