# HangMan Game


#### Pre-requisites to run the game
* Docker

#### Run Instructions:
* clone from github
* Go to parent directory
* Open Terminal
* Type `docker-compose up --build`.
* After succesfully build and run the docker-compose file, go to the browser and enter this link `http://localhost:3000/`.
* This docker-compose file is designed only for local development purpose, not for production.



#### Task Details:

The task is to build a version of the game ‘hangman’ https://en.wikipedia.org/wiki/Hangman_(game)

The game should be implemented as a web application using NodeJS as a backend/server component, and a ReactJS based web front end.
The game should submit moves to the back end and render the outcome on the page.
It should be possible for more than 1 person to play the game at the same time
It should be possible to restart the browser and not loose your position in the game.
The game should use a remote ‘random word’ webservice, there are many of these freely available on the internet.
Please submit a version of this project within 1 week.
