# Project conventions for AI assistants

Working norms for AI agents (Claude Code, Codex, etc.) contributing to
this repository. Read this before opening a PR.

## Pull requests

- **Subscribe to PR activity on open.** Immediately after creating a
  pull request, subscribe to its activity stream so CI failures and
  review comments arrive in the session as
  `<github-webhook-activity>` events. From there, investigate each event
  on arrival — fix small/clear issues directly, ask before changes that
  are architecturally significant or ambiguous, skip events that don't
  warrant action.

  Tooling specifics:
  - Claude Code: call `mcp__github__subscribe_pr_activity` with the PR
    number. Do this without being asked.
  - Other tooling: use the equivalent webhook / event-stream
    subscription. If no equivalent exists, poll the PR's check-runs and
    review-comments endpoints once before ending the turn.

- Don't end the turn after opening a PR until the subscription is in
  place. The subscription is what closes the loop between "PR opened"
  and "PR mergeable" — without it the agent is blind to the verdict.
