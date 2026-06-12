# GitHub Actions Setup

## npm Trusted Publishing (required for publishing)

Publishing uses [npm Trusted Publishing](https://docs.npmjs.com/trusted-publishers) via GitHub OIDC — no `NPM_TOKEN` secret is needed.

1. Log in at [npmjs.com](https://www.npmjs.com/) as a maintainer of `@qpub/qui`
2. Open the package → **Settings** → **Trusted Publisher**
3. Add a **GitHub Actions** trusted publisher for this repository (`qpubio/qui`, workflow `publish.yml`, environment optional)

## Publishing a release

1. Bump `version` in `package.json` (must match the tag, without the `v` prefix)
2. Commit and push to `main`
3. Create and push a version tag:

```bash
git tag v0.1.0
git push origin v0.1.0
```

4. The **Publish to npm** workflow runs automatically: typecheck → lint → build → publish → GitHub release

## CI

Pushes and pull requests to `main` run typecheck, lint, and build on Node 18, 20, and 22.

## Troubleshooting publish 404

If the workflow signs provenance but fails with:

```text
npm error 404  '@qpub/qui@x.y.z' is not in this registry.
```

the package likely **does exist** — this is usually an auth/CLI issue, not a missing package:

1. **npm version** — Trusted Publishing requires **npm ≥ 11.5.1**. The publish workflow uses Node **24.x** for this reason (Node 20 ships npm 10).
2. **Trusted Publisher** — on npm, confirm repository is `qpubio/qui`, workflow is `publish.yml`, environment is blank.
3. **Re-run** — after fixing, delete and re-push the tag or re-run the failed workflow.
