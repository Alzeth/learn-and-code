import tsEslint from 'typescript-eslint';
import angular from '@angular-eslint/eslint-plugin';
import angularTemplate from '@angular-eslint/eslint-plugin-template';
import angularTemplateParser from '@angular-eslint/template-parser';
import prettierConfig from 'eslint-config-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

const localPlugin = {
  rules: {
    'no-code-comments': {
      meta: {
        type: 'suggestion',
        docs: { description: 'Disallow comments that are not ESLint directives.' },
        schema: [],
        messages: { unexpected: 'Comments are not allowed. Remove the comment or convert it to code.' },
      },
      create(context) {
        const DIRECTIVE = /^\s*eslint[-\s]/i;
        return {
          Program() {
            for (const comment of (context.sourceCode.ast.comments ?? [])) {
              if (!DIRECTIVE.test(comment.value)) {
                context.report({ loc: comment.loc, messageId: 'unexpected' });
              }
            }
          },
        };
      },
    },
  },
};

export default tsEslint.config(
  {
    ignores: ['dist/', 'node_modules/', '.angular/', 'src/app/shared/'],
  },
  {
    files: ['**/*.ts'],
    extends: [...tsEslint.configs.recommended],
    plugins: {
      '@angular-eslint': angular,
      local: localPlugin,
      'simple-import-sort': simpleImportSort,
    },
    languageOptions: {
      parserOptions: {
        project: ['tsconfig.app.json', 'tsconfig.spec.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@angular-eslint/prefer-on-push-component-change-detection': 'error',
      '@angular-eslint/prefer-standalone': 'error',
      '@angular-eslint/prefer-inject': 'error',
      '@angular-eslint/prefer-signals': 'error',
      '@angular-eslint/no-uncalled-signals': 'error',
      '@angular-eslint/prefer-output-emitter-ref': 'error',
      '@angular-eslint/prefer-output-readonly': 'error',

      // ── Lifecycle hygiene ─────────────────────────────────────────────────
      '@angular-eslint/use-lifecycle-interface': 'error',
      '@angular-eslint/no-empty-lifecycle-method': 'error',

      // ── Input / output conventions ────────────────────────────────────────
      '@angular-eslint/no-input-rename': 'error',
      '@angular-eslint/no-output-on-prefix': 'error',

      // ── TypeScript quality ────────────────────────────────────────────────
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'error',

      // ── General ───────────────────────────────────────────────────────────
      'no-console': 'error',
      'local/no-code-comments': 'error',
      'no-restricted-imports': ['error', {
        patterns: [
          {
            group: ['@app/*', '@app/**'],
            message: "Use 'app/...' instead of '@app/...'",
          },
          {
            group: ['src/app/*', 'src/app/**'],
            message: "Use 'app/...' instead of 'src/app/...'",
          },
        ],
      }],
      'simple-import-sort/imports': ['error', {
        groups: [
          ['^(?!app/)(?!@app/)@?\\w'],
          ['^app/', '^@app/'],
          ['^\\.'],
        ],
      }],
      'id-length': ['error', {
        min: 2,
        properties: 'never',
        exceptions: ['_'],
        exceptionPatterns: ['^[A-Z]$'], // TypeScript generic type parameters (T, K, V, etc.)
      }],
    },
  },
  {
    files: ['**/*.html'],
    plugins: {
      '@angular-eslint/template': angularTemplate,
    },
    languageOptions: {
      parser: angularTemplateParser,
    },
    rules: {
      '@angular-eslint/template/no-negated-async': 'error',
      '@angular-eslint/template/prefer-self-closing-tags': 'warn',
    },
  },
  prettierConfig,
  {
    files: ['**/*.ts'],
    rules: {
      'indent': ['error', 2, { SwitchCase: 1 }],
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0, maxBOF: 0 }],
    },
  },
);
