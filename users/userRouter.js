const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
    res.send('/api/users')
});

router.post('/:id/posts', validateUserId, (req, res) => {
    res.send('/api/users/id/posts')
});

router.get('/', (req, res) => {
    res.send('/api/users/')
});

router.get('/:id', validateUserId, (req, res) => {
    res.send('/api/users/:id')
});

router.get('/:id/posts', validateUserId, (req, res) => {
    res.send('/api/users/:id/posts')

});

router.delete('/:id', validateUserId, (req, res) => {
    res.send('/api/users/:id')
});

router.put('/:id', validateUserId, (req, res) => {
    res.send('/api/users/:id')
});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;
  if(Number.isInteger(parseInt(id, 10))) {
    req.user = id;
    console.log('valid id')
    next();
  } else {
      res.status(400).json({message: `The Id of "${id}" is not valid`});
  }
};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
