const express = require("express");
const Users = require("./userDb");

const router = express.Router();

router.post("/", validateUser, (req, res) => {
  res.send("/api/users");
});

router.post("/:id/posts", validateUserId, (req, res) => {
  res.send("/api/users/id/posts");
});

router.get("/", (req, res) => {
  res.send("/api/users/");
});

router.get("/:id", validateUserId, (req, res) => {
  res.send("/api/users/:id");
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
    const user = await Users.getById(id);
    if (user) {
      req.userId = id;
      next();
    } else {
      res
        .status(404)
        .json({ message: `The user with Id of '${id}' could not be found` });
    }
  } else {
    res.status(400).json({ message: `The Id of '${id}' is not valid` });
  }
}

function validateUser(req, res, next) {
    const { name } = req.body;
    
    if(Object.keys(req.body).length === 0){
        res.status(400).json({message: 'Missing user data'})
    } else if(!name) {
        res.status(400).json({message: 'Missing required name field'})
    } else {
        next();
    }
}

function validatePost(req, res, next) {}

module.exports = router;
