---
description: Review changes, run checks, and commit
---

Before committing:

1. Run typecheck: `npm run typecheck`
2. Run lint: `npm run lint`
3. Run tests (if they exist): `npm test`

If all checks pass:
4. Review git diff to understand all changes
5. Stage relevant files with `git add`
6. Create a commit with a conventional commit message
7. Show git status to confirm

DO NOT commit:
- .env files
- node_modules
- build artifacts
- API keys or secrets
