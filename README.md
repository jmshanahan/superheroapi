# Introduction

This project consists of both a frontend and backend. The same README will accompany both projects.
The frontend code is available from github [here](https://github.com/jmshanahan/superherofe)
The backend code is available from github [here](https://github.com/jmshanahan/superheroapi)

# Overview
The back end is an api application and returns only json. It is connected to [Superhero api](https://superheroapi.com/index.html)
and it will return the details of a superhero api given its ID number.
An example https request is https://jshanahan.biz/3 . The ID number just needs to be appended to the request.
It can easily be tested from the browser or postman. (If testing from browser please enter the request with https)

The front end is a React application. The user enters a hero ID. This in turn sends the request to the back end and this will fetch the Hero and return it to the react application.

## Disclaimer
I acknowledge that this could all be done directy from the React application but to purpose of this assignment was to implement some frontend and backend code therefore it was done this way.
I did not have the knowledge to implement this as requested so basically I did the best I could with the knowledge that I had.

# Technical Details

## BackEnd
The backend has been setup on a blank Ubuntu Server machine running in the AWS EC2 environment.
Nginx has been installed and it has been secured with LetsEncrypt. 
The service was build on node with expressJS installed with it.
Nginx acts as a reverse proxy and forwards requests to the node application at the correct port.
The reverse proxy configuration file is available with the source code.
The node application is kept alive with [pm2](https://www.npmjs.com/package/pm2)
The server was given some level of security by installing [Fail2ban](https://www.fail2ban.org/wiki/index.php/Main_Page)
To retreive an Hero simply append its id to the end of the Url is http:/jshanahan.biz/6
There are 731 hero ID so the ID will have to be less than this.
Due to time limits it is pretty crude. Little error validation was put in place.

## FrontEnd
The frontend was build with React. It was implemented with the AWS Amplify tool.
It is really basic. The user simply enters a Hero ID. It then forwards the request to the backend and the backend then forwards the request to the superhero api.
The superhero name, image and powerstats are return to the react application and displayed to the user. More here ID can be added in turn.
The front end is available from [www.josephshanahan.biz](www.josephshanahan.biz)





