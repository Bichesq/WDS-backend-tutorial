const express = require('express');
const Author = require('../models/author');
const router = express.Router();

// All authors
router.get('/', async (req, res) => {
    const searchOptions = {};
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i'); // 'i' for case-insensitive
    }
    try {
        const authors = await Author.find(searchOptions)
        res.render('authors/index', {authors: authors, searchOptions: req.query.name});
    } catch {
        res.redirect("/")
    }
    
})

//New authors   
router.get('/new', (req, res) => {
    res.render('authors/new', {author: new Author()})
})

// Create new author
router.post('/new', async (req, res) => {
    console.log('POST /authors/new body:', req.body);
    const author = new Author({
        name: req.body.name,
        email: req.body.email
    });

    try {
        const newAuthor = await author.save();
        res.redirect('/authors');
    } catch (err) {
        console.error('Error creating author:', err.message);
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error Creating Author'
        });
    }
});
module.exports = router; 