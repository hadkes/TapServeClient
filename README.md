# TapServeClient - Client for TapServe web application

## Generating war file for deploying to the server

1. Install Apache Maven from https://maven.apache.org/install.html
1. Build project using following command `$mvn clean install`
1. This will build a war file in the target folder with the name TapServeClient.war
1. This war file can be deployed to an application server instances (such as wildfly).

## Generating and running the docker image

The repo also contains a Dockerfile that can be used to generate a docker container to run the application. Please follow the steps below:

1. Install Docker
1. Run `$docker build . -t tapserveclient`
1. Run `$docker run -p 8080:8080 tapserveclient`
1. Go the URL [http://localhost:8080/TapServeClient/](http://localhost:8080/TapServeClient/)
