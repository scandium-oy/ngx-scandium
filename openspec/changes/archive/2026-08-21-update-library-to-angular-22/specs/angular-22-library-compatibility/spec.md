## Purpose

Defines how the published library is built, consumed, and supported on Angular 22 while preserving its existing public API and disclosing the temporary AngularFire compatibility exception.

## ADDED Requirements

### Requirement: Angular 22 consumer contract
The published package SHALL declare Angular 22 as the supported major for its Angular peer dependencies and SHALL NOT claim Angular 21 compatibility.

#### Scenario: Angular 22 application resolves the library contract
- **GIVEN** an application uses supported Angular 22 framework packages
- **WHEN** the application evaluates the library's published peer dependencies
- **THEN** the Angular peer ranges accept that Angular 22 installation
- **AND** the peer ranges do not advertise Angular 21 as supported

### Requirement: Production package builds on the Angular 22 toolchain
Maintainers SHALL be able to produce the library package with mutually compatible Angular 22 build tooling, TypeScript, Zone.js, and a Node.js runtime supported by Angular 22.

#### Scenario: Production build succeeds
- **GIVEN** the workspace dependencies are installed with the documented AngularFire override on a supported Node.js runtime
- **WHEN** a maintainer runs the production library build
- **THEN** the build completes successfully under strict TypeScript and Angular template compilation
- **AND** the distributable package is emitted from the existing public entry point

#### Scenario: Unsupported Node runtime is rejected
- **GIVEN** the workspace is running on a Node.js version outside Angular 22's supported engine range
- **WHEN** a maintainer attempts to install or build the workspace
- **THEN** the documented prerequisites identify the runtime as unsupported

### Requirement: Existing public API remains available
The Angular 22 package SHALL preserve the exported components, directives, interceptors, models, pipes, services, and utilities exposed by the current public entry point unless a separate breaking change explicitly modifies them.

#### Scenario: Public entry point is compared before publication
- **GIVEN** the Angular 21 package's public exports
- **WHEN** the Angular 22 package is prepared for publication
- **THEN** every existing exported symbol remains available from the package entry point
- **AND** migration-only source changes do not intentionally alter consumer-visible behavior

### Requirement: AngularFire compatibility exception is explicit
The workspace SHALL retain `@angular/fire@21.0.0-rc.0` only through an explicit peer-dependency override, and maintainers and consumers SHALL be warned that this Angular 22 combination is unsupported by AngularFire.

#### Scenario: Maintainer installs migration dependencies
- **GIVEN** AngularFire 21 declares Angular 21 peers and no AngularFire 22 release is available
- **WHEN** a maintainer installs the Angular 22 workspace dependencies
- **THEN** installation uses the documented peer-dependency override
- **AND** the resulting lockfile records the selected dependency set reproducibly

#### Scenario: Consumer adopts the Angular 22 library
- **GIVEN** a consumer depends on the library's Firebase-facing exports
- **WHEN** the consumer upgrades to the Angular 22 library release
- **THEN** migration documentation identifies the AngularFire incompatibility and required install override
- **AND** the consumer is informed that runtime verification does not make the combination officially supported

#### Scenario: Compatible AngularFire release becomes available
- **GIVEN** an AngularFire release officially supports Angular 22
- **WHEN** maintainers remove the temporary override in a follow-up change
- **THEN** the workspace and published peer contract use the supported AngularFire release
- **AND** the exception documentation is removed

### Requirement: Migration verification is reported
The migration SHALL report production build and relevant non-interactive test outcomes without claiming checks that were not executed.

#### Scenario: Verification completes
- **GIVEN** the Angular 22 dependency and migration changes are applied
- **WHEN** maintainers validate the change
- **THEN** the production library build result is recorded
- **AND** relevant test results, unavailable checks, and remaining AngularFire risk are reported separately
