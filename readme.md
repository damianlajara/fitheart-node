# Welcome to fitHeart

### Setup

After getting a copy of the repo and `cd`ing into the root of the app, run the following in the terminal:
```sh
$ npm init
$ mongod
```
This will install all the app's dependencies as listed in the package.json file and then run mongo.

Now open a new terminal tab or process and run:
```sh
$ gulp
```
This will build all the files and run the server for you.

Now that we have the DB and server up, it's time to open a new tab or process again and run:
```sh
$ gulp watch
```
The `gulp watch` command is optional, but I highly recommended it if you don't want to constantly run all the gulp tasks to compile the assets yourself 
every time you make a change to css or js files needed on the frontend.

### Happy Coding
Visit your [localhost](http://localhost:3000/) and you're all set!