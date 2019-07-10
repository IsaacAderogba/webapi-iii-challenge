const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
    res.send('/api/users')
});

router.post('/:id/posts', (req, res) => {
    res.send('/api/users/id/posts')
});

router.get('/', (req, res) => {
    res.send('/api/users/')
});

router.get('/:id', (req, res) => {
    res.send('/api/users/:id')
});

router.get('/:id/posts', (req, res) => {
    res.send('/api/users/:id/posts')

});

router.delete('/:id', (req, res) => {
    res.send('/api/users/:id')
});

router.put('/:id', (req, res) => {
    res.send('/api/users/:id')
});

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
