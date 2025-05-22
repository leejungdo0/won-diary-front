import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...compat.extends([
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended", // Prettier와 충돌 방지
    "next/core-web-vitals"
  ]),
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
  },
  {
    rules: {
      // 사용자 지정 룰 (필요 시 조정)
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["warn"],
      "prettier/prettier": ["warn"]
    }
  }
];
