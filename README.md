# InstaTags

Web App made for Exam 1 from Web Development class at Universidad de los Andes.

It's a platform that allows users to find the most commonly associated tags to a tag entered as text input. The app is designed to show the top 10 associated tags, and the 10 last queries made inside the web page.

## Running the demo

The project is deployed in a [heroku server](https://insta-tags1.herokuapp.com/)

Nonetheless, if you are curious enough, you can download this repo and view your app with the following steps: 

```
npm install
cd frontend
yarn install
yarn build
cd ..
npm start
```
Then open your browser on http://localhost:3001

Requires a Mongo server with a database running locally, change the code to fit your own parameters.

The app itself is pretty intuitive.

## Technologies used

**DataBase**
* MongoDB

**Back End**

* NodeJS
* Express

**Front End**

* React
* HTML
* CSS
* javascript

## What makes it special

In addition to great design and intuitive basic functionalities, instaTags allows users to not only seacrh Tags by input text, but by clicking on _either_ the previous queries or one of the top tags. 

This can be achieved by making a component that includes a button for each tag, and allowing it to change the state in clas App. By changing state, a new query can be made to the Backend.

## Tools/Old projects used

Example node + express + react + Mongo app generate for the [WebDev class at uniandes](johnguerra.co/classes/webDevelopment_spring_2018/)

**Express app generate** using express generator and react app on the frontend folder with **create-react-app**.

