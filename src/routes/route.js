const express = require('express');

const router = express.Router();
const authorController = require("../controllers/authorController")
const blogController=require("../controllers/blogController")
const MW = require("../middleware/auth")

//<<<<<<<<--------------------- Create-Author ----------------------->>>>>>>>>>>>>

router.post("/authors",authorController.createAuthor)

//<<<<<<<<------------------------- Log-in -------------------------->>>>>>>>>>>>>

router.post("/login",authorController.login)

//<<<<<<<<------------------------ Create-Blog ---------------------->>>>>>>>>>>>>

router.post("/blogs",MW.authentication,blogController.createBlog)

//<<<<<<<<----------------------- Get-Blog's ------------------------->>>>>>>>>>>>>

router.get("/blogs",MW.authentication,blogController.getBlog)

//<<<<<<<<----------------------- Update-Blog ----------------------->>>>>>>>>>>>>


router.put("/blogs/:blogId",MW.authentication,MW.authorisation,blogController.updateBlog)

//<<<<<<<<--------------- Delete-Blog-By-Path-Params ---------------->>>>>>>>>>>>>


router.delete("/blogs/:blogId",MW.authentication,MW.authorisation,blogController.deleteBlog)

//<<<<<<<<--------------- Delete-Blog-By-Query-Params ---------------->>>>>>>>>>>>>

router.delete("/blogs",MW.authentication,blogController.deleteByQuery)



module.exports = router;