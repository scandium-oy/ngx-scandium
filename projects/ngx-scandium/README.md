# NgxScandium

This project is collection of reusable components used in Scandium Apps.

## Installation

Run `npm i @scandium-oy/ngx-scandium`.

## Running

`AuthService` needs `INavigationService` implementation and you need to provide that in your module.

```
{ provide: INavigationService, useClass: NavigationService },
```