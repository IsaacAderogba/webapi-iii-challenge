const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('/api/posts')
});

router.get('/:id', (req, res) => {
    res.send('/api/posts/:id')
});

router.delete('/:id', (req, res) => {
    res.send('/api/posts/:id')
});

router.put('/:id', (req, res) => {
    res.send('/api/posts/id')
});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;