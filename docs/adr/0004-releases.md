# ADR 0004 — Releases

- **Status:** accepted
- **Date:** 2026-08-27
- **Scope:** `.github/workflows/pr.yml`, `.github/workflows/release.yml`, `scripts/next-version.mjs`.

## Context

The package is consumed by several applications.Version numbers are the only thing those applications
can pin, so a release has to be a deliberate, traceable act — but one nobody has to remember to
perform, because the release everyone forgets is the one that gets done by hand at 11pm.

Two shapes were considered.

**Bumping inside the pull request.** A bot commits the new version to the PR branch. It reads well
and shows the version in the diff, but it breaks under ordinary use: two open PRs both bump
`0.1.0 → 0.1.1` and the second merge conflicts on `package.json`; the bot's push re-triggers CI; the
number goes stale the moment another PR merges first; and pushing to a fork's branch needs write
access the workflow does not have.

**Bumping on merge.** The version is computed when the PR merges. None of the above happens, because
only one thing writes the version and it writes it once.

## Decision

### V1 — A merged pull request is the unit of release

`release.yml` triggers on `pull_request: [closed]` filtered by `merged == true`. A direct push to
`main` publishes nothing — deliberately. If it is worth releasing, it is worth a PR.

### V2 — The bump level is declared, then inferred, then assumed

`scripts/next-version.mjs` is the single source of the rule, used by both the preview and the
release so they cannot disagree:

1. a `major` / `minor` / `patch` label on the PR (a `release:` prefix is accepted);
2. otherwise a Conventional Commits PR title — `feat!:` or `BREAKING CHANGE` is major, `feat:` is
   minor;
3. otherwise `patch`.

Two conflicting labels fail the run rather than picking one. A `no-release` label skips publishing
entirely, for PRs that change only documentation or CI.

The default is `patch` and not "fail unless declared" because the common case really is a patch, and
a gate everyone clicks through teaches people to click through gates.

### V3 — The pull request shows the version it will release

`pr.yml` posts and keeps updated a single comment saying which version merging will publish, and
writes the same to the job summary. It **does not** commit anything. This is what V1 gives up in
visibility, bought back without the failure modes.

### V4 — Publishing prefers OIDC over a stored token

The publish step uses npm trusted publishing when it is configured, and falls back to an `NPM_TOKEN`
secret when one is set. A long-lived npm token in a public repository's secrets is a credential that
can be exfiltrated by any workflow change; OIDC is short-lived and scoped to this repository and
workflow.

The `publish` job runs in a GitHub `release` environment, so a required reviewer can be added later
without touching the workflow.

### V5 — The release re-runs every check

`ci.yml` already ran on the PR head. `release.yml` runs the full suite again against `main` after the
merge, because that is a different tree: a PR that was green can merge into a `main` that is not.

## Consequences

- `main` must accept a push from `github-actions[bot]`. If branch protection is enabled, that actor
  needs a bypass, or the push fails after the checks have already passed.
- The release commit carries `[skip ci]`, so it does not re-trigger CI or the docs deploy. The merge
  commit immediately before it already deployed the docs.
- Version numbers are not in the PR diff. The PR comment is where you look.
