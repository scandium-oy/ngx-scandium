## 1. Establish Migration Baseline

- [x] 1.1 Record the current `projects/ngx-scandium/src/public-api.ts` exports and relevant dependency versions so the Angular 22 result can be compared without changing the public surface.
- [x] 1.2 Add a supported Node runtime declaration in the root project metadata and runtime selector, then verify migration commands run on Node `^22.22.3`, `^24.15.0`, or `>=26.0.0` rather than the current unsupported Node 24.1.0.

## 2. Upgrade the Angular Toolchain

- [x] 2.1 Run the official Angular core and CLI major-22 migrations, using force only to cross the accepted AngularFire 21 peer conflict, and review every generated workspace/source change.
- [x] 2.2 Align root `package.json` on mutually compatible Angular 22 framework packages, CLI/build tooling, compiler CLI, `ng-packagr` 22, TypeScript `>=6.0 <6.1`, and Zone.js 0.16 while retaining compatible RxJS and Ionic versions.
- [x] 2.3 Retain `@angular/fire@21.0.0-rc.0`, configure the documented `legacy-peer-deps` install mode, and regenerate `package-lock.json` reproducibly on the supported Node runtime.

## 3. Update the Published Library Contract

- [x] 3.1 Change `projects/ngx-scandium/package.json` to library major 22 and bound every Angular peer dependency to `>=22.0.0 <23.0.0`, while keeping the exact AngularFire 21 release-candidate peer.
- [x] 3.2 Audit imports under `projects/ngx-scandium/src/lib` against library peer metadata and resolve any missing or inconsistent Angular 22 peer contract without unrelated dependency upgrades.
- [x] 3.3 Apply only Angular 22 or TypeScript 6 compatibility fixes required by strict compilation, and verify `projects/ngx-scandium/src/public-api.ts` exports are unchanged from the baseline.

## 4. Document the Breaking Migration

- [x] 4.1 Update the root `README.md` with the supported Node prerequisite, maintainer install command, and reason for the temporary peer-dependency override.
- [x] 4.2 Update `projects/ngx-scandium/README.md` with Angular 22 consumer requirements, the AngularFire 21 unsupported-risk warning and install override, and guidance for Angular 21 consumers to remain on library major 21.

## 5. Verify Packaging and Consumption

- [ ] 5.1 Inspect the installed dependency tree and confirm the only accepted peer incompatibility is AngularFire 21 versus Angular 22; treat every additional conflict as a blocker.
- [ ] 5.2 Run `npm run build` and verify the production package is emitted successfully with strict compilation and partial Ivy compilation.
- [ ] 5.3 Run `npm test -- --watch=false --browsers=ChromeHeadless`, recording the result and the repository's current lack of behavioral spec files without overstating coverage.
- [ ] 5.4 Pack the library without publishing and compile a temporary Angular 22 consumer fixture that installs with the documented override and imports the existing public entry point, including Firebase-facing exports.
- [ ] 5.5 Summarize the exact build, test, consumer-smoke, public-export comparison, and remaining unsupported AngularFire runtime risk before publication.
