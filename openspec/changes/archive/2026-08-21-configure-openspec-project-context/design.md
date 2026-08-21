## Context

See `proposal.md` for motivation. This repository is a single-project Angular workspace whose deliverable is the published `@scandium-oy/ngx-scandium` library. The implementation is under `projects/ngx-scandium/src/lib`, and every supported consumer entry point is re-exported from `src/public-api.ts`.

The package spans standalone Angular/Ionic components, directives, pipes, services, models, utilities, Firebase integrations, and Capacitor integrations. The compiler enables strict TypeScript, strict injection checks, strict input access, and strict templates. The root scripts define `npm run build` and `npm test`; no test specs currently exist.

## Goals / Non-Goals

**Goals:**

- Give every future artifact enough durable context to reason about this repository without rediscovering its basic structure.
- Protect the compatibility surface of a published library by making public API and peer-dependency impact explicit during planning.
- Establish concise, testable artifact guidance and proportionate verification expectations.
- Keep the configuration maintainable by recording stable conventions rather than a full inventory that quickly becomes stale.

**Non-Goals:**

- Document every exported class or implementation detail in `config.yaml`.
- Change application behavior, source code, package metadata, dependencies, or release automation.
- Impose conventions that the repository does not currently follow, such as mandatory conventional commits or a new test framework.

## Decisions

### Use one compact multiline project context

The `context` value will summarize the product boundary, stack, source layout, compatibility surface, compiler constraints, integration areas, and verification commands. This gives artifact authors a coherent overview while keeping the YAML readable.

Alternative considered: enumerate every component and service. Rejected because the list duplicates `public-api.ts` and will become stale as the library evolves.

### Treat consumer compatibility as the central planning constraint

Artifact rules will require explicit consideration of public exports, Angular/Ionic/Firebase/Capacitor peer compatibility, and breaking changes. This is more useful for a reusable npm package than application-oriented guidance about routes or deployment environments.

Alternative considered: generic Angular rules only. Rejected because they would not capture the cost of changing a published library's consumer-facing contracts.

### Keep rules outcome-focused and artifact-specific

Proposal rules will identify consumer impact and non-goals; spec rules will describe observable behavior with Given/When/Then scenarios; design rules will cover API and dependency trade-offs; task rules will identify concrete files and verification. Apply guidance will require relevant tests plus a production library build, while archive guidance will require a concise compatibility summary.

Alternative considered: place all instructions in `context`. Rejected because OpenSpec exposes dedicated rule and operation sections, which target guidance more precisely and reduce noise in every artifact.

### Do not claim tests that the repository does not have

The context will state that Jasmine/Karma infrastructure is configured but no `*.spec.ts` files currently exist. Tasks should add focused tests for changed behavior where practical and always run the build, rather than assuming an established test suite.

Alternative considered: state that tests are mandatory for every change. Rejected because documentation-only or configuration-only changes may not have meaningful executable behavior to test.

## Risks / Trade-offs

- [Version details become stale after dependency upgrades] → Refer to major versions and package manifests as the source of truth; update the context during major migrations.
- [Detailed guidance makes generated artifacts repetitive] → Keep rules short and require only information relevant to the proposed change.
- [No existing tests means `npm test` may offer limited assurance] → Require focused tests for changed behavior where practical and retain `npm run build` as the baseline package verification.
- [Rules may overemphasize backward compatibility for intentionally breaking work] → Permit breaking changes when they are explicitly labeled and paired with migration guidance.

## Migration Plan

1. Replace the placeholder `openspec/config.yaml` comments with the selected context, artifact rules, and operation guidance while retaining `schema: spec-driven`.
2. Validate the YAML and OpenSpec configuration with the CLI.
3. Review the rendered configuration to ensure instructions are concise and repository-specific.

Rollback is a single-file revert to the current template configuration; no runtime or consumer migration is required.
