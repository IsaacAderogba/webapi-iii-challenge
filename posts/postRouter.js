const express = require("express");
const Posts = require("./postDb");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await Posts.get();
    res.status(200).json(posts);
  } catch {
    res.status(500).json({ message: "The posts could not be retrieved" });
  }
});

router.get("/:id", validatePostId, async (req, res) => {
  try {
    const post = await Posts.getById(req.post.id);
    res.status(200).json(post);
  } catch {
    res.status(500).json({ message: "The post could not be retrieved" });
  }
});

router.delete("/:id", validatePostId, async (req, res) => {
  try {
    const deletedPost = await Posts.remove(req.post.id);
    if (deletedPost) {
      res.status(200).json(req.post);
    } else {
      res.status(500).json({ message: "The post could not be deleted" });
    }
  } catch {
    res.status(500).json({ message: "The post could not be deleted" });
  }
});

router.put("/:id", validatePostId, async (req, res) => {
  try {
    const updatedPost = await Posts.update(req.params.id, {
      text: req.body.text,
      user_id: req.post.user_id
    });
    if (updatedPost) {
      const post = await Posts.getById(req.params.id);
      res.status(200).json(post);
    } else {
      res.status(500).json({ message: "The post could not be updated" });
    }
  } catch {
    res.status(500).json({ message: "The post could not be updated" });
  }
});

// custom middleware

async function validatePostId(req, res, next) {
  const { id } = req.params;
  if (Number.isInteger(parseInt(id, 10))) {
    try {
      const post = await Posts.getById(id);
      if (post) {
        req.post = post;
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
}

module.exports = router;
