const express = require('express');
const Author = require('../models/author');
const router = express.Router();

// All authors
router.get('/', (req, res) => {
    res.render('authors/index');
})

//New authors   
router.get('/new', (req, res) => {
    res.render('authors/new', {author: new Author()})
})

// Create new author
router.post('/new', (req, res) => {
    const author = new Author({
        name: req.body.name
    })
    author.save((err, newAuthor) => {
        if (err) {
            res.render('authors/new', {
                author: author,
                erroMessage: 'Error Creating Author'
            })
        }
    })
    res.send(req.body.name)
})
module.exports = router;