# International

- The framework supports internationalization and comes with built-in support for English and
  Chinese.

## Code folder

- English：`src/locales/en-US.json`
- Chinese：`src/locales/zh-CN.json`

## How to use

- All strings that need to be internationalized in the code are in English. After collecting the
  strings using the command line, there is no need to update the `en.json` file. Only the
  corresponding Chinese strings need to be modified in the `zh.json` file to complete the
  internationalization process.
- To internationalize strings, you can use the `t` function.

  - The internationalization syntax is `t('Action')`.
  - Note that capitalization matters in English.
  - The `t` function supports strings with parameters.

    - Parameters are indicated by {}. For example:

      ```javascript
      confirmContext = () =>
        t('Are you sure to { action }?', {
          action: this.actionName || this.title,
        });
      ```

- Collection

  ```shell
  grunt
  ```

  - After collecting, the `en-US.json` and `zh-CN.json` files will be automatically updated.

  - "Update Chinese strings in the zh-CN.json file.

    - After collecting, you can directly update the corresponding Chinese translation in the
      `zh-CN.json` file.
