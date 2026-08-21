# NgxScandium

This project is collection of reusable components used in Scandium Apps.

## Installation

Version 22 requires Angular `>=22.0.0 <23.0.0`. Angular 21 applications must
remain on `@scandium-oy/ngx-scandium@21`.

AngularFire does not currently provide an Angular 22-compatible release. This
library temporarily uses `@angular/fire@21.0.0-rc.0`, which declares Angular
21 peer dependencies. Consumers that accept this unsupported combination must
install with npm peer enforcement disabled:

```sh
npm install @scandium-oy/ngx-scandium@22 @angular/fire@21.0.0-rc.0 --legacy-peer-deps
```

Successful installation and compilation do not make this AngularFire/Angular
22 combination officially supported. Validate Firebase behavior in the
consuming application before releasing it.

## Running

`AuthService` needs `INavigationService` implementation and you need to provide that in your module.

```
{ provide: INavigationService, useClass: NavigationService },
```
