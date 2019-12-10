# Prerequisites
- You should have [Node.js](https://nodejs.org/en/) and NPM installed (NPM is installed automatically with latest versions of Node.js) which are needed by both [frontend](https://github.com/JoelNiklaus/ESE-2019-Scaffolding/tree/master/frontend) and [backend](https://github.com/JoelNiklaus/ESE-2019-Scaffolding/tree/master/backend) projects. You can verify whether you have both by running `node -v` and `npm -v` in terminal or command prompt.
- You should have [Angular CLI](https://cli.angular.io/) globally installed on your machine (`npm install -g @angular/cli`).
- You should have [Ionic](https://ionicframework.com/) globally installed on your machine (`npm install -g ionic`).


## Getting started
- Clone this repo on your machine and immediately delete `.git` folder.

## Understanding project structure
- The main project folder contains two subfolders: frontend and backend. These two are projects on their own which you will run independently. 
- The backend folder contains an express project that serves as a REST API, exposes endpoints to accept HTTP requests. For received HTTP requests, it in turn returns JSON data.
- The frontend folder contains an Angular project, which makes HTTP requests to the backend and processes the JSON data received i.e. make changes if required and display it on the UI.
- Projects are separated in this way because in the future one can easily replace either of them if the team decides to use another technology e.g. React JS for frontend or Django REST framework for backend.

# Front-End Scaffolding

## Initial Setup
1. Install [Node.js](https://nodejs.org/en/) (must be done already, as it is a part of prerequisite!)
2. `cd` into this frontend folder with your terminal or command prompt
3. Run `npm install` which will install all the required dependencies
4. Run just `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
5. For a mobile view, run `ionic serve --port 4200 --lab`

## A quick introduction to modules, components and services in Angular
[Architecture](https://angular.io/guide/architecture)

## Build

Run `ng build` to build the project.

# Back-End Scaffolding

## Initial Setup
1. Install [Node.js](https://nodejs.org/en/) (must be done already, as it is a part of prerequisite!)
1. `cd` into this backend folder with your shell (note: if you're on Windows, you can for example use [Git Bash](https://git-scm.com/download/win) as a shell)
1. run `npm install`

## Build

Run `npm run tsc` to compile the TypeScript code to Javascript. After that, this folder should have a `build` folder containing a bunch of JavaScript files

Note: The tests in the test folder are directly written in javascript, but you still
need to compile before being able to run the tests.

## Run the tests

1. Compile the backend with `npm run tsc`
1. Run `npm test` to execute all backend tests

## Run the backend

### Run with the production database

In this mode, `db.sqlite` is used as the database (or created if it doesn't exist).
The database isn't altered, except if an admin doesn't exist. In this case, a default admin
is created with `username: admin` and `password: admin`.

1. Compile the backend with `npm run tsc`
2. Run `node build/server.js` to execute the backend. The command line output should say something like `Listening at http://localhost:3000/`

### Run with a test database

In this mode, a database `testDb.sqlite` is created and filled with test offers and 
two test users. If the database already existed, it's content will be destroyed and
replaced by the test data. This mode is useful for demonstrations.

Credentials for the created users:
- username: admin, password: admin
- username: 123, password: 123

1. Compile the backend with `npm run tsc`
1. Run `node build/server.js testdb` to execute the backend with the test Database

## Explanations
The inline comments in the .ts files of this scaffolding should help you understand most of what's going on. Here are a few additional explanations:
- While the application is just JavaScript code running in Node.js (see next point), the actual source code is written in TypeScript (.ts). TypeScript is essentially "JavaScript with types", and will be compiled to JavaScript to run in Node.js. Bottom line: only edit the .ts files, since all JavaScript files in this backend are compiler-generated and will be overwritten as soon as you recompile the application.
- Since this is the backend, the JavaScript code compiled from TypeScript will not be running in a web browser. Instead, we use [Node.js](https://nodejs.org) as our JavaScript runtime. You can think of Node.js as something similar to the Java Virtual Machine to run your compiled Java program, or a Python interpreter to run your Python code.
- Because we want to build a web server, we are using the [Express.js](http://expressjs.com/) JavaScript web framework to help us with handling requests and providing responses. If you study the import statements in this scaffolding, you can see Express.js how is being used here.

## Adding a New Endpoint or Controller
To add a new endpoint that logically belongs to an existing controller, you simply have to add a new route to that controller's Router.

If you need to define a new controller, there are a few things you need to do:
1. create a new file `<mycontroller>.controller.ts` in the `controllers` folder. Check out our example controllers to see what to do within that file.
2. Import your new controller in `server.ts`
3. in `server.ts`, mount the new controller analogous to the ones that are already in there (using `app.use(...)`)

## Write tests for endpoints in Controllers
[Mocha](https://mochajs.org/) is used for the testing in the backend.

## Streamline Your Development
So far, you need to recompile your TypeScript code and restart your express application after every change. This can get annoying really quickly, but can streamline this process by doing two things:
1. Instead of `npm run tsc`, use `npm run tsc -- --watch`. This will automatically recompile your TypeScript code to JavaScript every time a TypeScript file has changed on disk, as long as this command is running (i.e. until you abort it or close the shell). Don't forget to check that shell for compiler errors!
2. Install nodemon on your system (`npm install -g nodemon`), then run the express application using `nodemon build/server.js` (instead of `node build/server.js`). Similar to the `--watch` command above, this will restart your Node application (and thus, your server) every time a JavaScript file has changed on disk.

As long as you let these two processes run in two separate shells, your Node server should always be running and be up to date with your latest changes, every time you save one of your TypeScript files.

# Note regarding ports
The frontend must be running on port 4200 and the backend on port 3000, no matter what enviroment the programms are running in.

# Using the program
A regular user can see offers, but can't do anything with them.
A logged in user can see offers as well as contact data of the user submitting the offer. If the user wishes to purches the offer, he must contact the user by the means provided outside of the platform.
A logged in user can also create an offer, which needs to be validated by the admin, however.
An admin has all the powers a regular user has, but can also validate offers, or deny them with a reason. He can also delete offers that are not his own; whis option is mainly to delete obvious nonsense offers, rather than sending them back to the user to change and resubmit - or to remove fraudulent offers that have already been set to public.

# ese2019-team7
