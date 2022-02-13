# Contribute to Greenpress

Greenpress is developed using micro services, and you can contribute to a single micro-service while still relying on the stable builds of the other micro services.

## Preparations

Greenpress is developed in Node.js, containarized with Docker, and version controlled using Git. All user's data such as posts, usernames, etc., is stored in a MongoDB database. You will need to have all four installed on your development machine in order to contribute to the Greenpress platform. _Note: On Linux and Mac, Git is pre-installed. If your development machine is Windows based, you will need to install Git as well._

To start your development environment, start by following the [getting started](https://docs.greenpress.info/guide/getting-started.html#installation) guide.

<!-- need to install node.js and docker. -->

##

## Contributor environment

Make sure your local project is not running by executing `greenpress stop` in your project's directory.

In your local project's directory, create a subfolder called `dev`, and navigate to that subfolder. The `dev` subfolder is already preconfigured in the `.gitignore` file, as each micro-service is expected to be developed independently.

Fork the repository of the micro-service you wish to contribute to (we will refer to the `admin-panel` micro service in this guide), and clone it using `git clone git@github.com:[USERNAME]/admin-panel.git` or `git clone https://github.com/[USERNAME]/admin-panel.git` where [USERNAME] is your Github username. Your `dev` folder should now contain a subfolder called `admin-panel`, and your project tree should look like this (for a newly created project):

> <span style="color:blue">my-app/ \
> **├── dev** \
> **│   └── admin-panel** \
> **│   &emsp;&emsp;└── ...** \
> ├── compose \
> ├── db-data \
> ├── tmp \
> </span> <span style="color:green">
> ├── Dockerfile \
> ├── greenpress.config.js \
> ├── LICENSE \
> ├── node_modules \
> ├── package.json \
> ├── package-lock.json \
> └── <span style="text-decoration:none;">README.md</span>
></span>

Navigate into the newly cloned subfolder, and run:

```bash
$ npm install
```

_Note: It is best to keep your forked repository up to date with greenpress's code. You can follow the workflow suggested by [Chaser324](https://github.com/Chaser324) on his popular [Github-forking](https://gist.github.com/Chaser324/ce0505fbed06b947d962) gist._

##

## Configuration

Assuming you followed our [getting started](https://docs.greenpress.info/guide/getting-started.html#installation) guide, you can launch your instance using Greenpress's CLI with one of a series of preconfigured local services.

To run your instance of Greenpress with a local service, in the project's parent directory, run:

```bash
$ greenpress start dev --local=<service name>
```
or
```bash
$ greenpress start dev -l <service name>
```

To follow with our admin service example above, in the directory `my-app`, one should run:
```bash
$ greenpress start dev --local=admin
```

The key services that can be run locally are:
Service name | Greenpress main repository
------------ | -------------
auth | https://github.com/greenpress/authentication-service
secretes | https://github.com/greenpress/secrets-service
assets | https://github.com/greenpress/assets-service
content | https://github.com/greenpress/content-service
admin | https://github.com/greenpress/admin-panel

_Note: Running multiple dev / local services can be done by separating their designation with a comma._
##
