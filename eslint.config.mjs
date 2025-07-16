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
      '@typescript-eslint/no-explicit-any': 'warn', // any 타입 함수를 사용할 경우 경고. 완전히 off 하고싶으면 warn 대신 off를 넣을 것.
      '@typescript-eslint/no-unused-vars': 'warn', // 사용 하지 않는 함수가 있으면 경고. 완전히 off 하고싶으면 warn 대신 off를 넣을 것.
    },
  },
];

export default eslintConfig;
