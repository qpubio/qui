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
