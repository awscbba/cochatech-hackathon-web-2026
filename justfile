# Default recipe
default:
    @just --list

# Install dependencies and set up git hooks
setup:
    pnpm install
    pnpm exec husky init
    echo "pnpm exec lint-staged" > .husky/pre-commit
    chmod +x .husky/pre-commit
    @echo "✔ Git hooks installed. Pre-commit will run lint and tests."

# Run linter
lint:
    pnpm lint

# Fix lint issues
lint-fix:
    pnpm lint:fix

# Type check
check:
    pnpm astro check

# Build the site
build:
    pnpm build

# Start dev server
dev:
    pnpm dev

# Run all CI checks locally
ci: lint check build
