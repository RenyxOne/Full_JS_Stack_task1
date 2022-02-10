module.exports = {
    env: {
        es6: true,
        browser: true,
        es2021: true,
    },
    extends: [
        'airbnb-base',
        'airbnb-typescript/base',
        'eslint:recommended',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
    },
    ignorePatterns: ['/*.*'],
    plugins: ['@typescript-eslint'],
    rules: {
        'import/prefer-default-export': 'off',
        'import/extensions': 'off',
        'import/no-unresolved': 'off',
        'no-restricted-syntax': 'off',
        '@typescript-eslint/no-var-requires': 'off',
    },
};
