const express = require("express");
const Users = require("./userDb");
const Posts = require("../posts/postDb");

const router = express.Router();

router.post("/", validateUser, async (req, res) => {
  try {
    const user = await Users.insert({ name: req.body.name });
    res.status(201).json(user);
  } catch {
    res.status(500).json({ message: "The users could not be created" });
  }
});

router.post("/:id/posts", validateUserId, validatePost, async (req, res) => {
  try {
    const post = await Posts.insert({
      text: req.body.text,
      user_id: req.params.id
    });

    res.status(201).json(post);
  } catch {
    res.status(500).json({ message: "The post could not be created" });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await Users.get();
    res.status(200).json(users);
  } catch {
    res.status(500).json({ message: "The users could not be retrieved" });
  }
});

router.get("/:id", validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.get("/:id/posts", validateUserId, async (req, res) => {
  try {
    const posts = await Users.getUserPosts(req.user.id);
    if (posts.length > 0) {
      res.status(200).json(posts);
    } else {
      res.status(404).json({ message: `No posts by that user could be found` });
    }
  } catch {
    res.status(500).json({ message: "The posts could not be retrieved" });
  }
});

router.delete("/:id", validateUserId, async (req, res) => {
  try {
    const deletedUser = await Users.remove(req.params.id);
    if (deletedUser) {
      res.status(200).json(req.user);
    } else {
      res.status(500).json({ message: "The user could not be deleted" });
    }
  } catch {
    res.status(500).json({ message: "The user could not be deleted" });
  }
});

router.put("/:id", validateUserId, async (req, res) => {
  const { name } = req.body;

  try {
    const updatedUser = await Users.update(req.params.id, { name });
    if (updatedUser) {
      const user = await Users.getById(req.params.id);
      res.status(200).json(user);
    } else {
      res.status(500).json({ message: "The user could not be updated" });
    }
  } catch {
    res.status(500).json({ message: "The user could not be updated" });
  }
});

//custom middleware

async function validateUserId(req, res, next) {
  const { id } = req.params;
  if (Number.isInteger(parseInt(id, 10))) {
    try {
      const user = await Users.getById(id);
      if (user) {
        req.user = user;
        next();
      } else {
        res
          .status(404)
          .json({ message: `The user with Id of '${id}' could not be found` });
      }
    } catch {
      res.status(500).json({ message: "The user could not be retrieved" });
    }
  } else {
    res.status(400).json({ message: `The Id of '${id}' is not valid` });
  }
}

function validateUser(req, res, next) {
  const { name } = req.body;

  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "Missing user data" });
  } else if (!name) {
    res.status(400).json({ message: "Missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  const { text } = req.body;

  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "Missing post data" });
  } else if (!text) {
    res.status(400).json({ message: "Missing required text field" });
  } else {
    next();
  }
}

module.exports = router;
