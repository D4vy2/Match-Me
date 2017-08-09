# Matcha

## What's that?

This project is the second web project of 42 school. The purpose of Matcha is to discover the basics of a framework (ie routing system), by making a basic dating site.
I did it with Node.js with the micro-framework Express.js, MySQL for the database, bootstrap 3 for the CSS, socket.io...

## Restrictions:

* Only micro-frameworks are allowed (exemple for PHP : Slim3, for Python : Flask, for Ruby : Sinatra, for Node : Express, etc...)
* No ORM allowed ("hand written" SQL queries)
* No validator (ie checking myself the data which are submitted)
* Some other minors instructions: Footer, header, responsive, displayable on mobile, etc...

## Main parts

The developpement of this project is kind of cut in 5 parts:

* Registration and connexion : the user can register the basics informations (name, nickname, mail, age...) and will have to provide more specifics informations (hobbies, gender, sexual orientation...). The user has to be geolocated. If he refuses, he will still be localized with his/her IP. 
* User profile : each users must have a profile, with a popularity score, and can edit his/her own. It must be public, and an user can "like" or block an other user. Also, an user can check who visited his/her profile, and who liked him/her.
* Gettings matches : when an user is "ready" to get marched with people, a list of user he/she should be interested with will be displayed. The matches are calculated from the distance, the common hobbies and their respective sexual orientations. The list can be filtered with some options such as popularity, age, maximum distance, etc. People being blocked won't be displayed in the matches.
* Chat : if two users like each other, they can start a chat. I used the websocket (socket.io) for that.
* Notifications : an user will get a notification when he'll be visited by someone, or if someone like/unlike him/her, or when someone sends him/her a chat message.

## Prerequisites

Node.js v7.9 and MySQL.

## Installing

First, run ```npm install``` command to install all depedencies.
You also need to create an SQL database named ```matcha_db```, then import the file "matcha_db.sql".
Now you can start server with ```node app.js``` then go to "http://localhost:8888/" and enjoy!
