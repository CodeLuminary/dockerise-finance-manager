## Finance manager with Docker

This is a docker base application which you can use to generate personal or business financial statement.


## Technology Stack & Tools

- NodeJs (Javascript runtime)
- Javascript (React & Testing)
- [Docker](https://www.docker.com/) (Containerizing applications)

## Project Folder Structure

The project root folder comprises two folders viz:

- react_app folder: This comprises the react application which is the frontend.
- app folder: This comprises the backend and the build files of the react application.

NB: You can choose to run the project in the app folder to view/use the application or run both the app & react_app project to view/use the application

## Start Development

Kindly fork and clone the repo 

## Installation

### REACT APP INSTALLATION

cd or navigate to the react_app folder in your terminal and enter the following command 

```
npm install
```
### BACKEND INSTALLATION

cd or navigate to the app folder in your terminal and enter the following command

``` 
npm install
```

## STARTING PROJECT

### STARTING REACT APP PROJECT

cd to the react_app folder from the root folder in your terminal and enter the following command

```
npm start
```

You can access the project in your browser by entering - `localhost:3000`


### STARTING APP PROJECT

cd to the app folder from the root folder in your terminal and enter the following command

```
npm start
```

You can access the project in your browser by entering - `localhost:5000`

### BUILDING/RUNNING THE APP PROJECT TO A DOCKER IMAGE

To create an image from this project, you will need to have docker installed and enter the following command in your terminal from the app folder directory(the Dockerfile is located in the app folder)

```
Docker build -t finance_manager .
```

To run the docker image, enter the following command

```
Docker run -it -p 5000:5000 finance_manager
```

You can also pull the already built image from docker hub [here](https://hub.docker.com/r/codeluminary/finance_manager) or by entering the following command in your terminal.

```
docker pull codeluminary/finance_manager
```

## 🎩 Author

- IJONI VICTOR 😁😁😁

> Don't forget to star the project 😁😁 . Thanks

