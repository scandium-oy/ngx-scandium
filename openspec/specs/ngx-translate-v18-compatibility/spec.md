# ngx-translate v18 Compatibility Specification

## Purpose

Defines the standalone ngx-translate 18 contract for library components and consumers while preserving the translation keys and messages exposed by the existing Angular 22 library.

## Requirements

### Requirement: ngx-translate 18 package contract
The published library SHALL require compatible ngx-translate core and HTTP loader 18 peer dependencies and SHALL NOT advertise ngx-translate 17 as supported.

#### Scenario: Angular 22 consumer evaluates peers
- **GIVEN** an Angular 22 application installs the library
- **WHEN** npm evaluates the library's ngx-translate peer dependencies
- **THEN** the peer ranges accept ngx-translate 18 core and HTTP loader packages
- **AND** the peer ranges do not claim ngx-translate 17 compatibility

### Requirement: Translated component content remains available
Standalone library components that render translation keys SHALL continue to render the same translated values after the module-based integration is removed.

#### Scenario: Camera button renders a translated title
- **GIVEN** a consumer configures ngx-translate 18 with a translation for the camera button title key
- **WHEN** the camera button renders its visible text
- **THEN** the rendered text is the configured translation

#### Scenario: Select dialog renders translated controls
- **GIVEN** a consumer configures translations for the select, filter, and clear keys
- **WHEN** the select dialog renders
- **THEN** its title, filter placeholder, and action labels use those translations

#### Scenario: Video button renders a translated title
- **GIVEN** a consumer configures a translation for the video button title key
- **WHEN** the video button renders its visible text
- **THEN** the rendered text is the configured translation

### Requirement: Service-originated translation messages remain available
Services and native-dialog components that resolve translations synchronously SHALL continue to use the configured translation service for their existing message keys.

#### Scenario: Service resolves a message key
- **GIVEN** the translation service has loaded a value for an existing service message key
- **WHEN** a library service prepares its user-visible message
- **THEN** the message uses that translated value

### Requirement: Exported HTTP loader configuration remains usable
The library's exported translation loader configuration SHALL be usable in ngx-translate 18's standalone provider setup and SHALL continue to load JSON assets from `./assets/i18n/` with a `.json` suffix.

#### Scenario: Consumer configures the exported loader
- **GIVEN** a consumer registers the exported loader configuration with its ngx-translate 18 root provider
- **WHEN** the consumer requests a language file
- **THEN** the HTTP loader requests `./assets/i18n/<language>.json`

### Requirement: Consumer migration is documented
Library documentation SHALL explain that ngx-translate 18 uses standalone providers and direct pipe/directive imports instead of `TranslateModule` configuration.

#### Scenario: Existing consumer upgrades translation setup
- **GIVEN** a consumer previously configured `TranslateModule.forRoot()` or `TranslateModule.forChild()`
- **WHEN** the consumer follows the library migration guidance
- **THEN** the consumer replaces the module configuration with the documented ngx-translate 18 provider functions
- **AND** the consumer understands that fallback language configuration uses the v18 terminology
