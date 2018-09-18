const express = require('express');
const router = express.Router();

const {BlogPosts} = require('./models');

router.get('/', (req, res) => {
    res.json(BlogPosts.get());
  });
  
  
  
  router.post('/', (req, res) => {
    const requiredFields = ['title', 'content', 'author'];
    for (let i=0; i<requiredFields.length; i++) {
      const field = requiredFields[i];
      if (!(field in req.body)) {
        const message = `Missing \`${field}\` in request body`
        console.error(message);
        return res.status(400).send(message);
      }
    }
    const item = BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate);
    res.status(201).json(item);
  });
  
  
  // when DELETE request comes in with an id in path,
  // try to delete that item from ShoppingList.
  router.delete('/:id', (req, res) => {
    BlogPosts.delete(req.params.id);
    console.log(`Deleted blog entry \`${req.params.ID}\``);
    res.status(204).end();
  });
  
  // when PUT request comes in with updated item, ensure has
  // required fields. also ensure that item id in url path, and
  // item id in updated item object match. if problems with any
  // of that, log error and send back status code 400. otherwise
  // call `ShoppingList.update` with updated item.
  router.put('/:id', jsonParser, (req, res) => {
    const requiredFields = ['title', 'content', 'author', 'id'];
    for (let i=0; i<requiredFields.length; i++) {
      const field = requiredFields[i];
      if (!(field in req.body)) {
        const message = `Missing \`${field}\` in request body`
        console.error(message);
        return res.status(400).send(message);
      }
    }
    if (req.params.id !== req.body.id) {
      const message = (
        `Request path id (${req.params.id}) and request body id `
        `(${req.body.id}) must match`);
      console.error(message);
      return res.status(400).send(message);
    }
    console.log(`Updating blog entry \`${req.params.id}\``);
    const updatedItem = ShoppingList.update({
      id: req.params.id,
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      publishDate: req.body.publishDate
    });
    res.status(204).end();
  })
  
  module.exports = router;