# Agent Guide for Multibyte

`multibyte` is a lightweight, dependency-free TypeScript library providing string functions that correctly handle multibyte Unicode characters. While native JavaScript methods often split surrogate pairs (e.g., emojis), this library ensures operations like `slice`, `split`, and `length` are Unicode-safe by treating the string as a collection of code points rather than UTF-16 code units.

## General

- **CRITICAL:** When you read these guidelines, say "I read AGENTS.md".
- **Git:** DO NOT BRANCH OR COMMIT without user review.
- **Support:** Consult docs/web for weak knowledge; ask if tasks are ambiguous or you're stuck (large files/output).
- **Environment:** Use `./temp` for temporary files.
- **Runtime:** Use `bun`, `bunx` and `bunx --bun`. DO NOT use `node`, `npm` or `npx` without user approval.

### Repository File Structure
- `/src`: Core logic. Each Unicode-safe function is implemented in its own file.
- `/tests`: Unit tests corresponding to each source file.
- `index.ts`: Main entry point exporting all public functions from `src/`.
- `/dist`: Generated build artifacts (CommonJS, ESM, and type definitions).
- `package.json`: Scripts, devDependencies (bun:test, esbuild, TypeScript), and metadata.
- `bun.lockb` & `tsconfig.json`: Environment and compiler configuration.

### Commands and Tools
- `bun run build`: Generates ESM, CJS, and DTS files using `esbuild`.
- `bun run lint`: Checks formatting, imports and lint rules using `biome`.
- `bun run format`: Formats all files in the project using `biome`.
- `bun test`: Executes the complete test suite using `bun:test`.
- `bun test --watch`: Runs tests in watch mode for active development.
- `bun run coverage`: Generates reports via `bun test --coverage`.
- `bun run build:clean`: Removes the `dist/` directory to ensure a fresh build.

### Development Rules
- **DO NOT USE NPM:** All development operations (install, test, build) must use `bun`.

### Coding Style Rules

- **Formatting:** Single statement per line. Explicit braces for `if`/`for`/`while` on new lines. No `return` on the same line as logic.
- **Logic:** Avoid nested ternaries. Max 80 chars for ternary lines; otherwise use `if` blocks.
- **Arguments:** Functions that need 3+ input values should accept 1 argument object with named properties.
- **Functional Approach**: Export standalone pure functions instead of modifying prototypes.
- **Immutability**: Never modify input parameters; always return derived values.
- **TypeScript:** Avoid `any`/`as any`; use `unknown` or proper interfaces.
- **CLI:** If building CLI tools, use `import { parseArgs } from "node:util"`.
- **Inline Documentation:** Write clear, concise comments. Use JSDoc for public APIs.
- **Markdown:** Organize with structured headings. Avoid using bold text for section titles or list titles.

### Domain Knowledge
- **Surrogate Pairs**: Characters like 🚀 use two 16-bit units. Native `length` counts units, but this library counts characters.
- **BOM (U+FEFF)**: Stripped from strings to prevent operation index offsets.
- **Code Points**: The atomic unit of Unicode. Use `Array.from(string)` or `for...of` for safe splitting.
