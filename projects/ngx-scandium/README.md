# NgxScandium

This project is collection of reusable components used in Scandium Apps.

## Installation

Run `npm i ngx-scandium`.

## Running

`AuthService` needs `INavigationService` implementation and you need to provide that in your module.

```
{ provide: INavigationService, useClass: NavigationService },
```