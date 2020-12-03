## Clone the service

Choose a service you would like to modify / commit changes, and clone it with the following command:
```
$ greenpress service create [service-name]
```

For example, if you like to modify the assets-service, just type:
```
$ greenpress service create assets
```

Note: You can enter several services, separated with commas.

Now, the service you cloned will exist at `/dev/[service-repository-name]`.


## Run Greenpress using your modified service
```
$ greenpress start dev -l assets
```