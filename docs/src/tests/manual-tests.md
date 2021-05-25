# Manual tests

## CLI service test

### In order to test the cli service follow this instructions:

1. Clone the branch you wish to test

   ```shell
       git clone -b [name of the branch] https://github.com/greenpress/greenpress-cli.git
   ```

2. Go to to the cloned repo directory and npm install

   ```shell
   cd greenpress-cli && npm install
   ```

3. Link the repo cli version:

   **_Windows:_**

   ```shell
   npm link --force
   ```

   **_Linux / macos:_**

   ```shell
   sudo npm link
   ```

4. Get out of the repo directory

   ```shell
   cd ..
   ```

5. Check if git, node, docker and docker-compose are presented in command's output

   ```shell
   greenpress missing
   ```

   Should print something like :

   ```text
    git is installed! Installed version: git version 2.29.2.windows.2

    docker is installed! Installed version: Docker version 20.10.0, build 7287ab3

    docker-compose is installed! Installed version: docker-compose version 1.27.4, build 40524192

    node is installed! Installed version: v14.15.1
   ```

6. Create new project and cd into it's directory

   ```shell
   greenpress create my-app && cd my-app
   ```

7. Change auth version to 1.0.10 in package.json/dependencies

   ```json
   "dependencies": {
     "@greenpress/admin": "^0.1.31",
     "@greenpress/assets": "^1.0.14",
     "@greenpress/auth": "^1.0.10", <---
      ...
   }
   ```

8. Upgrade greenpress and check that an upgrade for auth is suggested and that no upgrade for the rest is suggested. then check that the version changed in package.json/dependencies

   ```shell
   greenpress upgrade
   ```

9. Create admin and assets services locally. Then, check that a dev directory is created with admin and assets repos cloned in it.

   ```shell
   greenpress service create admin,assets
   ```

10. run the project and check that it is running correctly by open `localhost:3000/` in a browser.

    ```shell
    greenpress start
    ```

11. Run:

    ```shell
    greenpress populate
    ```

    Check that category, posts and admin credentials for admin panel are created correctly.

12. Stop the project.

    ```shell
    greenpress stop
    ```

13. Run project with local services.

    ```shell
    greenpress start dev -l admin,assets
    ```

    Check that `greenpress.local.env` contains `ADMIN_CWD` and `ASSETS_CWD` that are equal to `dev/service-name` and that the application is indeed running correctly.
