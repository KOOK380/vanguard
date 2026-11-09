import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Props are removed from a spread with rest destructuring, so siblings of a rest element are allowed.
      "@typescript-eslint/no-unused-vars": ["warn", { ignoreRestSiblings: true, argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    },
  },
  // All copy comes from the content layer in src/content (decision 259). Text written into JSX, or
  // into an alt, aria-label, title or placeholder, fails lint. The styleguide is a development tool
  // whose labels document tokens (decision 244), so it is exempt.
  {
    files: ["src/app/**/*.tsx", "src/components/**/*.tsx"],
    ignores: ["src/app/styleguide/**"],
    rules: {
      "react/jsx-no-literals": ["error", { noStrings: true, ignoreProps: true, allowedStrings: [] }],
      "no-restricted-syntax": [
        "error",
        {
          selector: "JSXAttribute[name.name=/^(alt|aria-label|title|placeholder|loadingLabel)$/] > Literal[value!=\"\"]",
          message: "Take this text from the content layer in src/content.",
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Project documents and raw assets, not application code:
    "project-docs/**",
    "content/**",
    "assets-raw/**",
  ]),
]);

export default eslintConfig;
