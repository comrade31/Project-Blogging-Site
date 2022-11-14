const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const controller= require('../controllers/authorController')
const blogController= require('../controllers/blogController')


router.post("/author",controller.createAuthor)
router.post('/createblog',blogController.createBlog)


module.exports=router










=======
const authorController = require("../controllers/authorController")
>>>>>>> 8e100dffda382c89a659ccf7d3ba24b85d8cf77c





router.post("/authors",authorController.createAuthor)



module.exports = router;