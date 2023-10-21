const express = require('express');
const routes = require('./routes');
// this was just sequelize before, but I needed specify where my connection was
const sequelize = require('./config/connection');
// import sequelize connection

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
// okay since this says, "then turn on the server" I am going to assume this should be in some type of follow up action or something.
// looking at the provided solution for a "sanity check" confirmed a promise was used, and I think that a creative and great solution. My first thought was to use a try/catch and have some type of boolean flag that would be set to true if the sync was successful then move on to satrt the server

sequelize.authenticate()
  .then(() => {
    console.info('Database connection has been established successfully.');

    sequelize.sync({ force: false }).then(() => {
      app.listen(PORT, () => {
        console.info(`App listening on port ${PORT}!`);
      });

    })
      .catch((error) => {
        console.error("There was an error when synchronizing the database.", "Here is the error text: ");
        console.error(error);
      });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
