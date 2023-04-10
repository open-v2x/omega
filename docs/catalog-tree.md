# Directory introduction

```js
├── deploy                              // Deployment-related configuration files
├── dist                                // default build output folder
├── docs                                // docs
├── e2e                                 // test files
├── env                                 // environments
├── public                              // Public files (such as images, favicon, etc.)
├── src                                 // source files
│   ├── assets                          // assets files
│   ├── common                          // common components
│   ├── components                      // public components
│   ├── constants
│   ├── core                            // app entry point
│   ├── design                          // public styles
│   ├── locales                         // i18n files
│   ├── pages                           // business code
│   ├── router                          // business code
│   ├── services                        // api
│   ├── store
│   ├── types
│   ├── typings
│   ├── utils                           // tools
├── tests                               // tests scripts
├── webpack                             // webpack configs
├── .dockerignore
├── .editorconfig
├── .eslintignore
├── .eslintrc.js                        // eslint config
├── .gitignore
├── .npmrc
├── .prettierignore
├── .prettierrc
├── .stylelintrc
├── babel.config.js                     // babel config
├── commitlint.config.js
├── Dockerfile                          // docker config file
├── dprint.json                         // github action code style checking
├── Gruntfile.js
├── LICENSE                             // license
├── package.json                        // package
├── playwright.config.ts                // e2e test configuration
├── postcss.config.js
├── README.md                           // README
├── tsconfig.json
```

## File naming conventions

### Filename

- A subfolder under the components folder, using PascalCase style with the first letter capitalized,
  such as PascalBase.
- Use PascalCase for component files, for example: MyComponent.ts. "- If the folder contains a
  component, the main entry point for the component should be named index, and it should have an
  index.ts file. The folder should be named using PascalCase. For example:

  ```js
  src / components / Button / index.ts;
  ```

- For other cases, use CamelCase for folder names. Singular or plural is case-specific.

### Image name

1. Image names must be in lowercase and special characters or Chinese characters are prohibited.
2. Use English words or abbreviations. Special characters are not allowed and pinyin should not be
   used.
3. Use underscore (\_) as a separator between words in the name.
4. Names should reflect the general purpose of the image.
5. Prohibit file names that do not correspond to the actual image content.

for example:

    ```js
    bg.jpg;
    mod_bg.jpg;
    ```
