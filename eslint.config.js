// @ts-check
import js from "@eslint/js"
import banRelativeImports from "eslint-plugin-ban-relative-imports"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
// import globals from "globals"
import tseslint from "typescript-eslint"

export default tseslint.config(
    {ignores: ["dist"]},
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            ecmaVersion: "latest",
            // globals: globals.browser,
        },
        plugins: {
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
            "ban-relative-imports": banRelativeImports,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            "ban-relative-imports/ban-relative-imports": "error",
            "func-style": ["error", "declaration"],
            "@typescript-eslint/ban-ts-comment": "off",
            "@typescript-eslint/no-unused-vars": "off",
            "@typescript-eslint/no-explicit-any": "off",
        },
    },
)
