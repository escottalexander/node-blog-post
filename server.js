const express = require('express');
const morgan = require('morgan');
const {BlogPosts} = require('./models');
const blogPostRouter = require('./blogPostRouter');

const app = express();

app.use(morgan('common'));

BlogPosts.create("The Happy Hare", "Once upon a time, there lived a hare named...", "Elliott Alexander");
BlogPosts.create("The Rabid Racoon", "Once upon a time, there lived a racoon named...", "Elliott Alexander");

app.use('/blog-posts', blogPostRouter);

app.listen(process.env.PORT || 8080, () => {
    console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
  });