const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    // res.send('Welcome to CodenBuild Backend')
    res.render('index');
})

module.exports = router;