const express = require('express');
const router = express.Router();
const controller= require('../controllers/authorController')
const blogController= require('../controllers/blogController')


router.post("/author",controller.createAuthor)
router.post('/createblog',blogController.createBlog)


module.exports=router


















module.exports = router;