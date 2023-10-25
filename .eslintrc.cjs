module.exports = {
  root: true,
  env: { es2021: true, node: true },
  extends: ["eslint:recommended"],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest" },
  rules: {
    indent: ["error", 2],
    eqeqeq: "error",
    "no-trailing-spaces": "error",
    "object-curly-spacing": ["error", "always"],
    "arrow-spacing": ["error", { before: true, after: true }],
    "no-console": 0,
  },
};
