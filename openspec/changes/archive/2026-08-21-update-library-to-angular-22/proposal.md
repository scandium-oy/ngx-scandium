## Why

Applications moving to Angular 22 need a matching build of `@scandium-oy/ngx-scandium`; the current Angular 21 toolchain, TypeScript 5.9 compiler, and Angular 21 peer contract cannot provide or validate that compatibility. Migrating now keeps the shared library aligned with its consumers and the supported Angular build ecosystem.

## What Changes

- **BREAKING**: Raise the library's Angular peer requirements from Angular 21 to Angular 22, ending the declared Angular 21 compatibility contract.
- Upgrade the workspace framework, CLI/build tooling, `ng-packagr`, TypeScript, Zone.js, and lockfile to a mutually compatible Angular 22 toolchain.
- Require a Node.js runtime supported by Angular 22 for install, build, test, and publish workflows.
- Retain `@angular/fire@21.0.0-rc.0` temporarily and install with an explicit unsupported peer-dependency override because no AngularFire 22 release is available.
- Run Angular migrations and make only the source/configuration changes required to compile the existing public API under Angular 22 and strict compiler settings.
- Verify production packaging and relevant non-interactive tests, and document the AngularFire exception for maintainers and consumers.
- Non-goals: adopting unrelated Angular 22 features, redesigning public APIs, upgrading Ionic or Capacitor without a demonstrated compatibility need, or replacing the Firebase integration.

## Capabilities

### New Capabilities

- `angular-22-library-compatibility`: Defines the package, build, runtime, and temporary AngularFire compatibility contract for consuming and publishing the library on Angular 22.

### Modified Capabilities

None. No main specifications currently exist.

## Impact

- Package/tooling files: root `package.json`, `package-lock.json`, library `projects/ngx-scandium/package.json`, Angular workspace configuration, and TypeScript configuration if migrations require it.
- Runtime/toolchain: Angular framework packages, Angular CLI/build tooling, `ng-packagr`, TypeScript 6.0, Zone.js, and a Node version accepted by Angular 22.
- Public contract: exported symbols and behavior remain stable, but supported Angular peer versions change to Angular 22.
- Integrations: AngularFire remains on its Angular 21 release candidate despite incompatible peer declarations; installs and CI require the documented override until a compatible release replaces it.
- Consumers: Angular 21 applications must remain on the current library major; Angular 22 consumers accept the AngularFire compatibility risk and installation override.
