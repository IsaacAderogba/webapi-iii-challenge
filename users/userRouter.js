const express = require("express");
const Users = require("./userDb");

const router = express.Router();

router.post("/", validateUser, (req, res) => {
  res.send("/api/users");
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  res.send("/api/users/id/posts");
});

router.get("/", async (req, res) => {
  try {
    const users = await Users.get();
    res.status(200).json(users);
  } catch {
    res.status(500).json({ message: "The users could not be retrieved" });
  }
});

router.get("/:id", validateUserId, async (req, res) => {
  res.status(200).json(req.user);
});

router.get("/:id/posts", validateUserId, (req, res) => {
  res.send("/api/users/:id/posts");
});

router.delete("/:id", validateUserId, (req, res) => {
  res.send("/api/users/:id");
});

router.put("/:id", validateUserId, (req, res) => {
  res.send("/api/users/:id");
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
