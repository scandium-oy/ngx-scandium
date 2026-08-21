## 1. Configure Project Guidance

- [x] 1.1 Replace the placeholder comments in `openspec/config.yaml` with concise context covering the published Angular library, source/public API layout, major integrations, strict compiler settings, and root verification commands.
- [x] 1.2 Add proposal, spec, design, and task rules that emphasize consumer-visible behavior, backward compatibility, Given/When/Then scenarios, concrete file scope, and verifiable work.
- [x] 1.3 Add apply and archive guidance requiring proportionate verification and a concise compatibility summary while retaining the `spec-driven` schema.

## 2. Verify OpenSpec Configuration

- [x] 2.1 Run `openspec context --json` and `openspec doctor` to confirm OpenSpec parses the updated repository configuration without errors.
- [x] 2.2 Review `openspec/config.yaml` against `package.json`, `angular.json`, `tsconfig.json`, and `projects/ngx-scandium/src/public-api.ts` to confirm every statement is accurate and no volatile API inventory is duplicated.
