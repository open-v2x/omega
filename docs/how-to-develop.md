# Quickly start

## Environment

- The development of OpenV2X Omega requires preparation of the backend environment. The environment
  preparation can be done using OpenV2X
  [All-in-One](https://github.com/open-v2x/docs/blob/master/docs/v2x-quick-install.md).

- After completing the environment setup, you can log in to Omega to configure the device. Please
  refer to the specific configuration guide for details
  [v2x-quick-start](https://github.com/open-v2x/docs/blob/master/docs/v2x-quick-start.md#4-edgeportal-%E5%92%8C-centralportal-%E7%9A%84%E5%BF%AB%E9%80%9F%E8%81%94%E5%8A%A8).

## Dependencies

- node

  - requirement in package.json：`"node": ">=14.17.0"`
  - Validate Node.js version, please confirm that the Node.js version meets the requirement

    ```shell
    node -v
    ```

    > Recommend using [nvm](https://github.com/nvm-sh/nvm) Manage node version.

- pnpm

  - Install pnpm

    ```shell
    npm install -g pnpm@7
    ```

  > Due to the lack of compatibility with higher versions of Node, please be aware not to use pnpm8.

- dependencies

  - Execute in the root directory of the project, i.e., at the same level as `package.json`, and
    patiently wait for the installation to complete.

    ```shell
    pnpm install
    ```

- Prepare a ready-to-use backend.

  - Prepare a backend that is accessible, for example: <http://47.100.126.13>.
  - Modify the proxy configuration in webpack/webpack.dev.js

    ```javascript
    dev: {
        '/api/omega': {
        target: 'http://47.100.126.13:8080',
        changeOrigin: true,
        },
    },
    ```

- Construction completed

  - In the root directory of the project, execute, that is, at the same level as the `package.json`
    file.

    ```shell
    pnpm run dev
    ```

  - Then the browser will automatically open and navigate to <http://localhost:2333>, where you can
    view the platform page.

## The package used in production environment.

- Have the required versions of `nodejs` and `pnpm`
- Execute in the project root directory, i.e., at the same level as `package.json`

  ```shell
  pnpm build
  ```

- The packaged files will be located in the `dist` directory. Please hand them over to the
  deployment team

## How to build a Docker image

```shell
docker build -t openv2x/omega:latest .
```

## How to run a Docker image

    ```shell
    docker run -d -p <port>:80 -e API_SERVER='http://<dandelion environment ip>/api' -e MAP_KEY=<Gaode Map key> -v <absolute path>/deploy/omega.conf:/etc/nginx/conf.d/default.conf -v <absolute path>/deploy/nginx.conf:/etc/nginx/nginx.conf --name=omega openv2x/omega:latest
    ```

## How to contribute to the code

- Please refer to the guidelines for contributing code by submitting a pull request (PR) on the
  project's repository
  [v2x_contribution](https://github.com/open-v2x/docs/blob/master/docs/v2x_contribution-zh_CN.md).
