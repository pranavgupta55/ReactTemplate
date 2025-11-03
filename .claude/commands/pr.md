---
description: Create a pull request with proper checks
---

Create a pull request:

1. Ensure all changes are committed
2. Run full check suite:
   - `npm run typecheck`
   - `npm run lint`
   - `npm run build`
   - `npm test` (if tests exist)
3. Push current branch to remote with `git push -u origin HEAD`
4. Use `gh pr create` to create PR:
   - Write clear title summarizing changes
   - Include bullet points in body describing what changed and why
   - Add test plan if relevant
5. Show the PR URL when done
