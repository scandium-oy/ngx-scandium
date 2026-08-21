## Context

See `proposal.md` for motivation and `specs/ngx-translate-v18-compatibility/spec.md` for the required behavior. The current Angular 22 workspace resolves `@ngx-translate/core` and `@ngx-translate/http-loader` 17.0.0. ngx-translate 18.0.0 supports Angular 18–22, TypeScript 6.0, and RxJS 7, but removes `TranslateModule`, `forRoot`, and `forChild` in favor of standalone provider functions and direct pipe/directive imports.

The library has three standalone components that import `TranslateModule`: camera button, select dialog, and video button. Their templates use only the `translate` pipe, so each can import `TranslatePipe` directly. Several services and the video component use `TranslateService.instant`; this API remains available and does not require a signals rewrite. `projects/ngx-scandium/src/lib/utility/translateConfig.ts` exports a `provideTranslateHttpLoader` provider configured for `./assets/i18n/<language>.json`.

## Goals / Non-Goals

**Goals:**

- Upgrade both ngx-translate packages together to their stable 18 release.
- Preserve all current translation keys, assets, template output, and synchronous service-message behavior.
- Make every standalone component compile using explicit translation imports.
- Keep the exported HTTP loader provider usable with `provideTranslateService` in consumer applications.
- Provide concise consumer migration guidance for module-to-provider configuration.

**Non-Goals:**

- Introduce the v18 signal `translate()` helper, translation blocks, child-service isolation, or per-call language overrides.
- Change consumer translation files, fallback-language choices, or translation-loading paths.
- Alter the Angular 22 migration, Firebase integration, or Ionic component behavior.

## Decisions

### Upgrade core and HTTP loader as a matched v18 pair

The root workspace dependencies and published peer dependencies will require ngx-translate 18 together, using open-ended minimum peer ranges. The lockfile will record the pair selected by npm.

Alternative considered: upgrade only core. Rejected because the library exports and documents `provideTranslateHttpLoader`, whose v18 peer contract requires ngx-translate core 18.

### Replace module imports with the smallest direct standalone import

`TranslateModule` will be replaced by `TranslatePipe` in the three components because their templates use the pipe and do not use the translation directive. This keeps component imports explicit and avoids introducing unused directives.

Alternative considered: replace every template translation with `TranslateService` or the v18 signal helper. Rejected because it would change rendering mechanics and expand the migration beyond compatibility work.

### Preserve service injection and exported loader configuration

Existing `TranslateService.instant` call sites will remain unchanged unless TypeScript exposes a v18 signature incompatibility. The exported loader value will continue to be built with `provideTranslateHttpLoader`; implementation will verify it can be supplied to `provideTranslateService({ loader: translateLoader })` without changing the configured path or suffix.

Alternative considered: make the library own the root translation service. Rejected because translation language, fallback policy, and asset ownership belong to the consuming application.

### Document standalone provider migration as a consumer-facing break

The library README will show provider-based configuration and direct component-import implications, calling out the `default` to `fallback` terminology change. The release version will remain part of the pending Angular 22 major if it has not been published; otherwise maintainers must issue the next breaking major.

Alternative considered: silently change peer ranges. Rejected because consumers using module configuration will encounter compile errors and need a clear migration path.

### Verify behavior through compilation and focused tests

The production library build must compile all standalone templates and public exports. Focused tests should cover the direct pipe imports and loader path if feasible within the current Jasmine/Karma setup; the existing non-interactive test command remains part of verification.

## Risks / Trade-offs

- [Consumer applications still use `TranslateModule`] → Documentation must show the required provider and direct-import replacements; this is a breaking release.
- [A component has an indirect directive use that search misses] → Review every template and compile the production package under strict templates.
- [The loader provider type changed] → Compile a small standalone provider configuration and verify the generated request path.
- [Synchronous `instant()` resolves before translations load] → Preserve existing semantics and document no behavior change; do not introduce asynchronous behavior as part of this upgrade.
- [v17 was already used by external consumers] → Bound peers to v18 and include explicit v17-to-v18 migration guidance.

## Migration Plan

1. Snapshot current ngx-translate imports, pipe use, service call sites, and exported loader behavior.
2. Upgrade core and HTTP loader to v18 as a pair, update peer ranges, and regenerate the lockfile.
3. Replace the three `TranslateModule` imports with `TranslatePipe`; apply only compiler-required source changes.
4. Verify the exported HTTP loader provider with a standalone root translation-provider configuration.
5. Add or update focused tests where practical, build the production package, and run non-interactive tests.
6. Update consumer documentation with v18 provider setup and breaking-change guidance.

Rollback restores both packages together at v17 and reverts the direct-pipe imports and provider-oriented documentation in one commit.
