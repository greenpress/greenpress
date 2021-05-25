# Local Docker Composition

Every instance of Greenpress can be run using a local docker composition. To do so properly,
two environment files should exist in the compose folder in the root of the application:
.env and greenpress.local.envץ

If using Greenpress's CLI tool, these files should already be created, but in case of failure,
follow this guide on handling them.

## .env

This file may contain all the applications' parameters that has to be determined by environment parameters, only if one wants to change their default values. An example for it can always be found
in the compose folder under the name .env.example.

In case of failure in its creation by the CLI tool, just copy the example file and save it under the
name ".env" under the compose folder in the app's root.

## greenpress.local.env

This file may contain any environment parameter that one would like to set in the app's container.

In case of failure in ts creation by the CLI tool, just create an empty file with that name under the compose folder in the app's root.