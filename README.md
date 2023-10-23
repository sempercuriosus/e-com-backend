# E-Commerce Backend

This is application is to support (mostly simulate) what an E-Commerce application would look like

## Table of Contents

- [About The Project and Features](#about-project)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites And Dependencies](#prerequisites-and-dependencies)
  - [Installation](#installation)
- [Routes](#routes)
- [Deployment Location](#deployment-location)
- [Challenges](#challenges)
- [Acknowledgments](#acknowledgments)
- [Author Credit](#author-credit)
- [Final Note](#final-note)

===

## About The Project and Features<a id="about-project"></a>

Here are the requirements for the application

```
WHEN I add my database name, MySQL username, and MySQL password to an environment variable file
THEN I am able to connect to a database using Sequelize

WHEN I enter schema and seed commands
THEN a development database is created and is seeded with test data

WHEN I enter the command to invoke the application
THEN my server is started and the Sequelize models are synced to the MySQL database

WHEN I open API GET routes in Insomnia Core for categories, products, or tags
THEN the data for each of these routes is displayed in a formatted JSON

WHEN I test API POST, PUT, and DELETE routes in Insomnia Core
THEN I am able to successfully create, update, and delete data in my database
```

- The application will create a database
  - `ecommerce_db`
- Use pre-defined models to create the tables
  - Category
  - Product
  - ProductTag
  - Tag
- Seed the database with test data
- This will interact with the database to follow CRUD Operations for data to
  - Create
  - Return
  - Update
  - Delete

### Built With<a id="#built-with"></a>

- Javascript
  - express.js
- dotenv
- mysql2
- sequelize

---

## Getting Started<a id="getting-started"></a>

- I left a lot of comments in my code for the same reason -- to inform those reading this later on.

### Prerequisites And Dependencies<a id="prerequisites-and-dependencies"></a>

- `dotenv` version `^8.2.0`
- `express` version `^4.17.1`
- `mysql2` version `^2.1.0`
- `sequelize` version `^5.21.7`

### Installation<a id="#installation"></a>

- `npm i` or `npm install` can be used to get the dependencies

### Testing

- No tests in this application

### Running The App

- This is a `CLI` based application and can be run with any terminal

#### Commands

- `start` runs the following `node server.js`
- `watch` runs the following `node --watch server.js`
- `dev` runs the following `npx nodemon server.js `
- `seed` runs the following `node seeds/index.js`

## Routes<a id="#routes"></a>

### Ping

- This is a test route to confirm that the server is up
- url `http://localhost:PORT/api/ping/`
- Returns `Therefore I must Pong`

### Products

- url `http://localhost:PORT/api/products`
- Uses
  - Get
    - `http://localhost:PORT/api/products`
    - `http://localhost:PORT/api/products/id`
  - Post
    - JSON Body
      - `{"product_name": "Fancy Shoes","price": 99.00,"stock": 5,"tagIds": [3],"category_id": 1}`
  - Put
    - JSON Body
    - `{"product_name":"Fancy Socks"}`
  - Delete
    - `http://localhost:PORT/api/products/id`

### Category

- url `http://localhost:PORT/api/categories`
- Uses
  - Get
    - `http://localhost:PORT/api/categories`
    - `http://localhost:PORT/api/categories/id`
  - Post
    - JSON Body
      - `{"category_name": Jeans}`
  - Put
    - JSON Body
    - `{"category_name":"Tall Teeshirts"} `
  - Delete
    - `http://localhost:PORT/api/categories/id`

### Tag

- url `http://localhost:PORT/api/tags`
- Uses
  - Get
    - `http://localhost:PORT/api/tags`
    - `http://localhost:PORT/api/tags/id`
  - Post
    - JSON Body
      - `{"tag_name": "Sample Tag"}`
  - Put
    - JSON Body
    - `{"tag_name": "Sample Tag"}`
  - Delete
    - `http://localhost:PORT/api/tags/id`

---

## Deployment Location<a id="deployment-location"></a>

- Example Video as this is not deployed
  - [Create Schema](https://drive.google.com/file/d/1iBEAywpWPooSjsIZrXFmL219f4WEmRqR/view?usp=share_link)
  - [Run Seed](https://drive.google.com/file/d/1mbeZsmR_VZZEwes_J1CfHkeN_JTbQLQC/view?usp=share_link)
  - [Start Server](https://drive.google.com/file/d/1j7IYBWyWHdvI0P94iumnhlWGYoBZbzI0/view?usp=share_link)
  - [Product Routes](https://drive.google.com/file/d/12ICCGTohtunGgmW7Dqtwn37163D7UUPg/view?usp=share_link)
  - [Category Routes](https://drive.google.com/file/d/1Jzt3hOoMaVRTvvm51kFoH1OEPrtadZo1/view?usp=share_link)
  - [Tag Routes](https://drive.google.com/file/d/1E7KlA4hxdSWn-_CjNuCWYpQ0kF2mB0d9/view?usp=share_link)

---

## Challenges<a id="challenges"></a>

- Trying to decipher these instructions was difficult, to me these were not the most clear, so I did what I thought was right.
  - I was took this instruction `WHEN I enter schema and seed commands THEN a development database is created and is seeded with test data` to mean I needed a `npm` command to run when I wanted to create the db. After a while, seeing this listed as `Use the schema.sql file in the db folder to create your database using MySQL shell commands.` I now think this means using `source` and the path to my db schema.
- I was trying to get `sequelize.sync()` to work, and initially I was getting an error saying that `.sync()` was not a function.
  - I resolved this by first trying research online, then chat gpt, and finally when I was not able to find anything used the example code. I saw my implementation was correct, but how `sequelize` was being declared as `const sequelize = require('sequelize');` was creating access to use `sequelize` itself, but not my connection that was created. `const sequelize = require('./config/connection');` was what I needed.
- In my model `index.js` I did not have the `foreign key` configuration in my model association in the `Category`, but without this `sequelize` would alias my `category_id` as `categoryId` instead of sticking with the snake_case model declaration.
  - I still do not understand why this happened, and it really threw me a curveball.

---

## Acknowledgments<a id="acknowledgments"></a>

- I used ChatGPT to help me debug and guide me, but I did not use code samples from it.
- I used the starter code for the occasional "sanity" check as I got started some and then when I got stuck.

## Resources Used

- [Sequelize Validations](https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/)
- [Sequqlize Authenticate](https://sequelize.org/docs/v6/getting-started/)
- [Sequelize Associations](https://sequelize.org/docs/v6/core-concepts/assocs/)
- [Update Method](https://medium.com/@sarahdherr/sequelizes-update-method-example-included-39dfed6821d)

---

## Author Credit<a id="author-credit"></a>

- Eric Hulse [semper curiosus](https://github.com/sempercuriosus)

---

## Final Note<a id="final-note"></a>

- Initially, getting things started took a while, but when I got the models in place and the first routes up I was off to the races. It was really exciting, slightly overwhelming, but overall really awesome to see things coming together more and put almost all of the things I have learned together on an application.

---

===

