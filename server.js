const express = require('express');
const morgan = require('morgan');
const {BlogPosts} = require('./models');
const blogPostRouter = require('./blogPostRouter');

const app = express();

app.use(morgan('common'));

BlogPosts.create("The Happy Hare", "Once upon a time, there lived a hare named...", "Elliott Alexander");
BlogPosts.create("The Rabid Racoon", "Once upon a time, there lived a racoon named...", "Elliott Alexander");

app.use('/blog-posts', blogPostRouter);

let server;

function runServer() {
  const port = process.env.PORT || 8080;
  return new Promise((resolve, reject) => {
    server = app
      .listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve(server);
      })
      .on("error", err => {
        reject(err);
      });
  });
}

function closeServer() {
  return new Promise((resolve, reject) => {
    console.log("Closing server");
    server.close(err => {
      if (err) {
        reject(err);
        // so we don't also call `resolve()`
        return;
      }
      resolve();
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };

