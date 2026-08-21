# About

Repository for the `@scandium-oy/ngx-scandium` Angular library.

## Requirements

Angular 22 tooling requires one of these Node.js ranges:

- `^22.22.3`
- `^24.15.0`
- `>=26.0.0`

The repository's `.nvmrc` selects Node 24.15.0:

```sh
nvm use
```

## Install

```sh
npm install
```

The project-local `.npmrc` enables `legacy-peer-deps` because no AngularFire
release currently supports Angular 22. The workspace temporarily retains
`@angular/fire@21.0.0-rc.0`, whose declared Angular 21 peer range conflicts
with Angular 22. This override is unsupported by AngularFire and must be
removed once a compatible AngularFire release is adopted. Review any peer
conflict other than this known exception as a blocker.

## Build and test

```sh
npm run build
npm test -- --watch=false --browsers=ChromeHeadless
```
