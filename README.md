# E-Commerce Smoke Suite

> **Repository:** [github.com/harold7910/E-Commerce-Smoke-Suite](https://github.com/harold7910/E-Commerce-Smoke-Suite)

Smoke test suite for [SauceDemo](https://www.saucedemo.com) built with **Playwright** and **TypeScript**, demonstrating optimization and parallelism capabilities.

## Architecture

- **Page Object Model (POM)** — Abstract `BasePage` class with page-specific implementations in `src/pages/`
- **Separated Locators** — All selectors centralized in `src/locators/` for easy maintenance
- **Constants** — Credentials, routes, and product names in `src/constants/`
- **Custom Fixtures** — Page objects injected automatically into tests via `tests/fixtures/`
- **Helpers** — Reusable utility functions in `src/helpers/`
- **storageState** — Authentication performed once and reused across all tests
- **Cross-browser** — Tests run in parallel on Chromium, Firefox, and WebKit
- **Trace Viewer** — Traces captured on failure for visual debugging

## Project Structure

```
E-Commerce-Smoke-Suite/
├── src/
│   ├── constants/                # Centralized test data
│   │   ├── users.ts              # User credentials
│   │   ├── routes.ts             # Page URLs
│   │   └── products.ts           # Product names
│   ├── locators/                 # Selectors separated by page
│   │   ├── login.locators.ts
│   │   ├── inventory.locators.ts
│   │   ├── cart.locators.ts
│   │   └── checkout.locators.ts
│   ├── pages/                    # Page Object Model classes
│   │   ├── base.page.ts          # Abstract base class
│   │   ├── login.page.ts
│   │   ├── inventory.page.ts
│   │   ├── cart.page.ts
│   │   └── checkout.page.ts
│   └── helpers/                  # Reusable utility functions
│       ├── cart.helper.ts
│       └── checkout.helper.ts
├── tests/
│   ├── fixtures/                 # Custom Playwright fixtures
│   │   └── pages.fixture.ts
│   ├── auth.setup.ts             # Auth setup (storageState)
│   ├── login.spec.ts             # Login flow tests
│   ├── cart.spec.ts              # Cart flow tests
│   ├── checkout.spec.ts          # Checkout flow tests
│   └── intentional-failure.spec.ts  # Intentional failure for trace demo
├── .github/workflows/
│   └── playwright.yml            # GitHub Actions CI pipeline
├── playwright.config.ts          # Cross-browser + trace configuration
└── tsconfig.json
```

## Prerequisites

- Node.js 20+
- npm

## Setup

```bash
npm install
npx playwright install
```

## Run Tests

```bash
# Run all tests (Chromium, Firefox, WebKit in parallel)
npm test

# Run on a specific browser
npm run test:chromium
npm run test:firefox
npm run test:webkit

# Run a single test by name
npx playwright test -g "add a product to the cart"

# View HTML report after execution
npm run report
```

## Generate trace.zip

The `intentional-failure.spec.ts` test is designed to fail and generate a trace file:

```bash
npx playwright test intentional-failure
```

The trace file will be saved in `test-results/`. To view it:

```bash
npx playwright show-trace test-results/<test-folder>/trace.zip
```

Or upload it to [trace.playwright.dev](https://trace.playwright.dev) for online viewing.

## CI/CD

Tests run automatically on push/PR to `main` via GitHub Actions. Reports and traces are uploaded as artifacts.

## Tech Stack

- [Playwright](https://playwright.dev/) — Test runner and browser automation
- [TypeScript](https://www.typescriptlang.org/) — Type-safe test code
- [GitHub Actions](https://github.com/features/actions) — CI/CD pipeline
