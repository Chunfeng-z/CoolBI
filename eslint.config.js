import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import eslintPluginImport from "eslint-plugin-import";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      import: eslintPluginImport,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "import/order": [
        "error",
        {
          groups: [
            "builtin", // Node.js 内置模块
            "external", // 外部 npm 依赖（如 react, lodash）
            "internal", // 内部模块（如 @/utils）
            "parent", // 相对路径：父级（../）
            "sibling", // 相对路径：同级（./）
            "index", // 入口文件（./index）
            "object", // 特殊类型（如 JSON）
            "type", // TypeScript 类型导入
          ],
          "newlines-between": "always", // 组之间保留空行
          alphabetize: {
            order: "asc", // 按字母顺序排序
            caseInsensitive: true, // 忽略大小写
          },
        },
      ],
    },
  }
);
