const express = require('express');
const Posts = require("./postDb");

const router = express.Router();

router.get('/', (req, res) => {
    res.send('/api/posts')
});

router.get('/:id', validatePostId, (req, res) => {
    res.send('/api/posts/:id')
});

router.delete('/:id', validatePostId, (req, res) => {
    res.send('/api/posts/:id')
});

router.put('/:id', validatePostId, (req, res) => {
    res.send('/api/posts/id')
});

// custom middleware

async function validatePostId(req, res, next) {
    const { id } = req.params;
    if (Number.isInteger(parseInt(id, 10))) {
      try {
        const post = await Posts.getById(id);
        if (post) {
          req.post = post;
          console.log(post);
          next();
        } else {
          res
            .status(404)
            .json({ message: `The post with Id of '${id}' could not be found` });
        }
      } catch {
        res.status(500).json({ message: "The post could not be retrieved" });
      }
    } else {
      res.status(400).json({ message: `The Id of '${id}' is not valid` });
    }
};

module.exports = router;