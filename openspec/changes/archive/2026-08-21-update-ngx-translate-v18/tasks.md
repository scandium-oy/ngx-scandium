## 1. Upgrade Translation Dependencies

- [x] 1.1 Upgrade root `package.json` and `package-lock.json` to the matched stable `@ngx-translate/core@18` and `@ngx-translate/http-loader@18` pair using the project Node runtime and existing install configuration.
- [x] 1.2 Change `projects/ngx-scandium/package.json` to require both ngx-translate peer dependencies at `>=18.0.0`, and keep the library release version aligned with whether the pending Angular 22 major has been published.

## 2. Migrate Standalone Translation Imports

- [x] 2.1 Replace `TranslateModule` with `TranslatePipe` in `camera-button.component.ts` and `select.dialog.ts`, retaining their existing template translation behavior.
- [x] 2.2 Replace `TranslateModule` with `TranslatePipe` in `take-video.component.ts` while preserving its `TranslateService` injection and native-dialog messages.
- [x] 2.3 Verify `projects/ngx-scandium/src/lib/utility/translateConfig.ts` remains a valid ngx-translate 18 provider for `provideTranslateService` and preserves the `./assets/i18n/<language>.json` request path.

## 3. Document the Consumer Migration

- [x] 3.1 Update `projects/ngx-scandium/README.md` with ngx-translate 18 installation requirements and provider-based configuration using the exported HTTP loader.
- [x] 3.2 Document removal of `TranslateModule.forRoot()` and `TranslateModule.forChild()`, direct pipe/directive imports, and the v18 fallback-language terminology without changing translation assets or keys.

## 4. Verify Translation Compatibility

- [x] 4.1 Add focused tests or a compile-time test configuration for the exported loader provider and direct pipe imports where practical in the existing Jasmine/Karma setup.
- [x] 4.2 Confirm no production source imports `TranslateModule`, and review all `TranslateService.instant` call sites to ensure their translation keys and synchronous behavior remain unchanged.
- [x] 4.3 Run `npm run build` and verify strict production compilation succeeds for all translated standalone components and the public package.
- [x] 4.4 Run `npm test -- --watch=false --browsers=ChromeHeadless` and report the exact result, including any limitation caused by the repository's current test coverage. (The command aborts with exit code 134 during Angular's build phase before Karma or any spec runs.)
