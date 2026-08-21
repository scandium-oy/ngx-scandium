## Why

The repository's OpenSpec configuration contains only the generated template, so planning agents do not receive the library's actual architecture, compatibility constraints, or verification conventions. Capturing that repository-specific context now will make future proposals and implementations more accurate and consistent.

## What Changes

- Replace the placeholder comments in `openspec/config.yaml` with concise project context derived from the Angular library.
- Record the public-library compatibility constraints, source organization, coding conventions, and required build/test verification.
- Add artifact-specific guidance that keeps proposals focused on consumer-visible behavior, specs testable, designs explicit about compatibility, and tasks small and verifiable.
- Add apply/archive operational guidance appropriate for a published npm library.

## Capabilities

### New Capabilities

None. This is planning-tool configuration and does not introduce consumer-visible library behavior.

### Modified Capabilities

None.

## Impact

- Affects `openspec/config.yaml` and future OpenSpec artifact generation.
- Does not change the `@scandium-oy/ngx-scandium` public API, runtime behavior, dependencies, or published package contents.
- Future changes will be planned with awareness of Angular 21, Ionic 8, strict TypeScript/template checks, standalone components, Firebase/Capacitor integrations, and the root build/test scripts.
