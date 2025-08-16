import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
	    {
      rules: {
        // 未使用変数・import のエラー化
        "no-unused-vars": "error",
        "@typescript-eslint/no-unused-vars": "error",

        // コンソール使用の警告
        "no-console": "warn",

        // モダンなJavaScript推奨
        "prefer-const": "error",
        "no-var": "error",

        // TypeScript型安全性
        "@typescript-eslint/explicit-function-return-type": "warn",
        "@typescript-eslint/no-explicit-any": "warn",

        // React/Next.js ベストプラクティス
        "react/jsx-key": "error",
        "react/no-unescaped-entities": "warn",

        // コード品質
        "eqeqeq": "error", // === 強制
        "curly": "error"   // 中括弧強制
      }
    }
];

export default eslintConfig;
