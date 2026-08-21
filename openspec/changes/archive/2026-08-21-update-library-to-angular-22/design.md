## Context

See `proposal.md` for motivation and `specs/angular-22-library-compatibility/spec.md` for the compatibility contract. The workspace currently uses Angular 21.2, Angular CLI/build 21.2, `ng-packagr` 21.2, TypeScript 5.9, Zone.js 0.15, and Node 24.1.0. Angular 22 requires TypeScript `>=6.0 <6.1` and Node `^22.22.3 || ^24.15.0 || >=26.0.0`, so the current Node runtime is not eligible even though its major is supported.

The library directly imports Angular common, HTTP, core, router, service worker, and AngularFire auth/firestore/storage APIs. Its published peer metadata already exposes the relevant Angular and AngularFire contracts. Ionic 8.8.3 accepts Angular 16 or newer, so Angular 22 does not by itself require an Ionic major upgrade.

As of proposal creation, the npm registry exposes Angular 22.1 framework/tooling packages but no AngularFire 22 version. `@angular/fire@21.0.0-rc.0` declares Angular 21 peers. The user explicitly selected an unsupported peer-dependency override instead of waiting for AngularFire 22 or replacing Firebase integration.

## Goals / Non-Goals

**Goals:**

- Produce a reproducible Angular 22 development and packaging toolchain on a supported Node runtime.
- Publish a new library major whose Angular peer ranges accept only Angular 22 within that major.
- Preserve the current `public-api.ts` exports and consumer-visible runtime behavior.
- Make the AngularFire incompatibility explicit, deterministic to install, and easy to remove later.
- Limit migration edits to changes required by Angular migrations, TypeScript 6, or build verification.

**Non-Goals:**

- Claim official AngularFire support for Angular 22.
- Adopt new Angular APIs or refactor working services and components for style alone.
- Upgrade Ionic, Capacitor, Firebase abstractions, RxJS, or other feature dependencies unless installation or compilation proves it necessary.
- Add a new test runner or comprehensive test suite as part of the framework migration.

## Decisions

### Use the latest mutually compatible Angular 22 release set at apply time

The migration will select current stable 22.x versions for Angular framework packages, CLI/build tooling, compiler CLI, and `ng-packagr`, then commit the resulting exact lockfile. TypeScript will remain within Angular 22's required `>=6.0 <6.1` interval, and Zone.js will move to a supported 0.16 release. Angular packages will stay on the same compatible release line even where framework and CLI patch numbers differ.

Alternative considered: pin the proposal-time patch versions. Rejected because patch releases can advance before apply, while the major/minor compatibility and lockfile provide the durable contract.

### Declare and standardize a supported Node runtime

The repository will declare Angular 22's Node engine requirement and provide a project runtime selector such as `.nvmrc` using a supported Node 24 release. Migration commands must run only after switching from the current Node 24.1.0 to at least Node 24.15.0 (or another runtime in Angular 22's engine range).

Alternative considered: rely on developer knowledge. Rejected because the current runtime demonstrates that matching the Node major alone is insufficient.

### Bound published Angular peers to major 22

The library package will change its Angular peer ranges to `>=22.0.0 <23.0.0` and advance the package major to 22. This accurately communicates the verified consumer range and prevents an untested future Angular major from satisfying metadata automatically.

Alternative considered: retain unbounded `>=22.0.0` ranges. Rejected because it would claim compatibility beyond what this migration verifies.

### Retain AngularFire 21 with an explicit legacy peer override

The workspace will keep `@angular/fire@21.0.0-rc.0` and configure/document `legacy-peer-deps` for reproducible maintainer installs. Angular migration commands may use their force option solely to cross the known AngularFire peer conflict. The library peer dependency remains explicit so consumers know Firebase-facing exports require AngularFire; consumer documentation will state that they must opt into the same override.

This exception is intentionally broad because npm's legacy mode ignores peer enforcement globally. Dependency review and `npm ls` output will therefore distinguish the expected AngularFire mismatch from any additional conflicts; unexpected conflicts remain blockers.

Alternatives considered: wait for AngularFire 22, remove Firebase exports, or pretend the AngularFire peer range supports Angular 22. The user rejected waiting/removal, and changing third-party metadata would misrepresent support.

### Preserve the public entry point and apply migrations narrowly

Angular update migrations will be run and reviewed, but source changes will be limited to compiler or runtime compatibility fixes. `projects/ngx-scandium/src/public-api.ts` will be compared before and after the migration. No symbol will be removed or renamed as part of this change.

Alternative considered: combine modernization refactors with the upgrade. Rejected because it would make regressions and consumer migration impact harder to isolate.

### Verify packaging first and tests proportionately

`npm run build` is the release gate because this repository publishes an Angular package with partial compilation. The existing non-interactive Karma command will also be attempted, but the repository currently has zero spec files; the result will be reported accurately rather than treated as meaningful coverage. Firebase-facing code must at minimum compile in the production build under the override.

Alternative considered: require new runtime integration tests for every Firebase service. Rejected as a separate test-infrastructure initiative, though any focused regression test required by a migration fix should be added.

## Risks / Trade-offs

- [AngularFire 21 may compile but fail at runtime on Angular 22] → Keep the exception visible, avoid claiming support, compile all Firebase exports, and require downstream application smoke testing before publication.
- [`legacy-peer-deps` can hide unrelated incompatibilities] → Review the resolved dependency tree and treat every conflict other than the accepted AngularFire/Angular 22 mismatch as a blocker.
- [Angular/TypeScript migrations change generated configuration or source semantics] → Review migration diffs, preserve strict settings, and keep only necessary changes.
- [Angular 21 consumers cannot install the new major] → Publish as library major 22 and document that Angular 21 applications must remain on major 21.
- [Current Node 24.1.0 cannot run Angular 22 tooling] → Make runtime upgrade the first implementation prerequisite and record the supported engine range.
- [No existing tests provide limited runtime assurance] → Use the production package build as the baseline and report the absence of behavioral coverage explicitly.

## Migration Plan

1. Capture the current public exports and dependency state, then switch to a Node runtime accepted by Angular 22.
2. Run the official Angular core/CLI update migrations for major 22 with force enabled only for the accepted AngularFire peer conflict.
3. Align Angular framework packages, CLI/build tooling, compiler CLI, `ng-packagr`, TypeScript, and Zone.js; regenerate the lockfile using the documented legacy peer mode.
4. Update the library's peer ranges and package major, retaining the exact AngularFire 21 release candidate and bounding Angular peers to major 22.
5. Review generated changes and apply only required strict-compiler or packaging fixes without altering the public entry point.
6. Document maintainer runtime/install prerequisites, consumer migration steps, and the temporary AngularFire risk.
7. Verify dependency-tree conflicts, compare public exports, run the production build, and attempt the relevant non-interactive tests.

Rollback consists of reverting the migration commit and lockfile together, restoring the Node/toolchain declarations and library package major to Angular 21. Do not publish the Angular 22 package until downstream Firebase smoke testing accepts the unsupported combination.
