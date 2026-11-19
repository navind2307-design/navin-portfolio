import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["src/components/sites/**/*.tsx"],
    rules: {
      // The clone intentionally mirrors the source markup, and the vendored
      // block scripts query these exact <img> elements.
      "@next/next/no-img-element": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Vendored source theme scripts, kept verbatim for interaction fidelity.
    "src/components/sites/onlines/vendor/**",
  ]),
]);

export default eslintConfig;
