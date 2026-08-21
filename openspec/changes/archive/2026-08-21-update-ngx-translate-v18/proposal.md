## Why

The workspace and published library still use ngx-translate 17, which is end-of-life. ngx-translate 18 is compatible with Angular 22 but replaces the deprecated module-based API with standalone providers and direct pipe/directive imports.

## What Changes

- **BREAKING**: Upgrade `@ngx-translate/core` and `@ngx-translate/http-loader` from 17 to 18 and constrain the library's peer contract to ngx-translate 18.
- Replace `TranslateModule` imports in standalone components with direct `TranslatePipe` imports while preserving existing template translation output.
- Preserve the exported HTTP loader provider and update its configuration or typing only where ngx-translate 18 requires it.
- Keep `TranslateService.instant` behavior for service and native-dialog messages, adapting only required API changes.
- Document the standalone provider migration for consumers, including the required replacement of `TranslateModule.forRoot()` and `TranslateModule.forChild()`.
- Non-goals: rewriting translations to signals, changing translation keys/assets, adopting optional ngx-translate v18 features, or modifying unrelated Angular/Ionic integrations.

## Capabilities

### New Capabilities

- `ngx-translate-v18-compatibility`: Defines the standalone translation integration and consumer contract for the library on ngx-translate 18.

### Modified Capabilities

None. No existing specification covers translation integration.

## Impact

- Affects root dependency/lock files, `projects/ngx-scandium/package.json`, three standalone components, the translation utility, and library documentation.
- Existing templates and service messages retain their translation keys and observable output.
- Consumers configuring ngx-translate must use v18 provider functions and direct pipe/directive imports; module-based setup is no longer available.
- This requires a breaking library release if the current Angular 22 package has already been published; otherwise it can be included in the pending Angular 22 major release.
