const blogModel = require("../models/blogModel")
const jwt = require("jsonwebtoken");

const {isValid,isValidRequestBody} = require("../validator/validator")
const { isValidObjectId } = require("mongoose")

const authorModel = require("../models/authorModel")


//<<<<<<<<------------------------- Create-Blog ---------------------->>>>>>>>>>>>>

const createBlog = async function (req, res) {
    try {
        const requestBody = req.body
        // const Id = req.body.authorId

        const { title, authorId, body, tags, category, subcategory } = requestBody

        //<<<<<<<<----------------- Data in body || not -------------------->>>>>>>>>>>>>

        if (!isValidRequestBody(requestBody)) 
        { return res.status(400).send({ status: false, msg: " Pls Provide requestBody"}) }

        //<<<<<<<<----------------- All Validation's -------------------->>>>>>>>>>>>>

        if (!isValid(title)) 
        {return res.status(400).send({ status: false, msg: " Pls Provide title for blog"}) }

        if (!isValid(body))
        { return res.status(400).send({ status: false, msg: " Pls Provide body"})}

        if (!isValid(authorId))
         { return res.status(400).send({ status: false, msg: " Pls provide author Id"}) }

        if (!isValidObjectId(authorId)) 
        { return res.status(400).send({ status: false, msg: " Pls provide Valid author Id"}) }

        if (!isValid(tags)) 
        { return res.status(400).send({ status: false, msg: "Pls provide tags"}) }

        if (!isValid(category)) 
        { return res.status(400).send({ status: false, msg: "pls provide category of Blog"}) }

        if (!isValid(subcategory)) 
       { return res.status(400).send({ status: false, msg: "pls provide subcategory of Blog"}) }


        const validId = await authorModel.findById(authorId)

        if (validId) {
            const blogCreated = await blogModel.create(requestBody)
            return res.status(201).send({ status: true, msg: 'blog created succesfully ', data: blogCreated })

        } else { res.status(400).send({ statusbar: false, msg: 'invalid authorid' }) }
    }

  catch (err) { return res.status(500).send({ status: false, msg: err.msg}) }

}


//*---------------------------------------------------------------------------//
//*---------------------------------------------------------------------------//

//<<<<<<<<-------------------------- Get-Blog's ------------------------>>>>>>>>>>>>>

const getBlog = async function (req, res) {
    try {
        const blogsData = await blogModel.find({ isDeleted: false }, { isPublished: true })
        if (req.query) {
            let { authorId, tags, category, subcategory } = req.query

        
            let obj = {}
            if (authorId)
             { obj.authorId = authorId  }

            if (tags) 
            { obj.tags = tags  }

            if (category) 
            { obj.category = category  }

            if (subcategory)
             { obj.subcategory = subcategory }

            obj.isDeleted = false
            obj.isPublished = true

            const getDetail = await blogModel.find(obj)
            if (!getDetail) {
                return res.status(400).send({ status: false, msg: "given data is invalid " })
            }
            else {
                return res.status(200).send({ status: true, data: getDetail})
            }
        } else {
            return res.status(200).send({ status: true, data: blogsData })
        }

    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

//*---------------------------------------------------------------------------//
//*---------------------------------------------------------------------------//

//<<<<<<<<------------------------ Put - Blog's ----------------------->>>>>>>>>>>>>


const updateBlog = async function (req, res) {

    try {
        const blogId = req.params.blogId

        if (!isValidObjectId(blogId)) {
            return res.status(400).send({ status: false, msg: "Please enter valid blog Id" })
        }

        const findBlogId = await blogModel.findById(blogId)
        if (!findBlogId) {
            return res.status(400).send({ status: false, msg: "blog not found" })
        }
        if (findBlogId) {
            const requestBody = req.body
            const { title, body, tags, subcategory, isPublished } = requestBody

            if (!isValidRequestBody(requestBody)) {
                return res.status(400).send({ status: false, msg: " Pls Provide requestBody" })
            }
            if (!isValid(title)) {
                return res.status(400).send({ status: false, msg: " Pls Provide title for blog" })
            }
            if (!isValid(body)) {
                return res.status(400).send({ status: false, msg: "Body is Mandtory" })
            }
            if (!isValid(tags)) {
                return res.status(400).send({ status: false, msg: "Pls provide tags of blog" })
            }
            if (!isValid(subcategory)) {
                return res.status(400).send({ status: false, msg: "Pls provide subCategory of blog" })
            }
            if (!isValid(isPublished)) {
                return res.status(400).send({ status: false, msg: "Pls provide  blog is published or not " })
            }

            let savedData = await blogModel.findOneAndUpdate({ _id: blogId }, {
                $set: { "title": requestBody.title, "body": requestBody.body, "category": requestBody.category },
                $push: { "tags": requestBody.tags, "subcategory": requestBody.subcategory }
            } , { new: true })

            res.status(200).send({ status: true, msg: "blog updated successfuly", data: savedData })
        }

    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })

    }

}

//<<<<<<<<---------------- Delete Blog by Query-Params  ---------------->>>>>>>>>>>>>

const deleteByQuery = async function (req, res) {
    try {
        let queryData =(req.query.category || req.query.authorId || req.query.tags || req.query.subCategory)

        if (!queryData){
            return res.status(404).send({status:false,msg:"You can only Delete blog  by category, authorid, tag name, subcategory name,or unpublished  blog"})
        } else
        {
       
            let authorId = req.query.authorId
            let category = req.query.category
            let tags = req.query.tags
            let subcategory = req.query.subcategory
            let isPublished = req.query.isPublished
            let obj = {};
            if (authorId) {
                obj.authorId = authorId;
            }
            if (category) {
                obj.category = category
            }

            if (tags) {
                obj.tags = tags
            }
            if (subcategory) {
                obj.subcategory = subcategory
            }
            if (isPublished) {
                obj.isPublished = isPublished
            }
            obj.isDeleted = false
            obj.isPublished =true

            let data = await blogModel.find(obj);
          
        
        if (data) {
            await blogModel.updateMany({ obj }, { isDeleted: true, deletedAt: Date.now() } )

                return res.status(200).send({ status: true, msg: "Blog Deleted succesfully" })
        }

        else {
               
            } return res.status(404).send({ status: false, msg: "The given data is Invalid or blog is already deleted" });
        
        }
    }
    catch (error) {
      return   res.status(500).send({ message: "Failed", error: error.message });
    }
}


//*---------------------------------------------------------------------------//
//*---------------------------------------------------------------------------//

///<<<<<<<<--------------- Delete Blog by Path-Params  ---------------->>>>>>>>>>>>>


const deleteBlog = async function (req, res) {

    try {
        let blogId = req.params.blogId

        let deleteBlog = await blogModel.findByIdAndUpdate({ _id: blogId }, { $set: { isDeleted: true } }, { new: true })
        res.status(200).send({ status: true, msg: deleteBlog })
        
        if (!deleteBlog) res.status(404).send({ status: false, msg: "Blogs are not found" })
    }

     catch (error) {
        return res.status(500).send({ status: false, msg: error.message});}
}




module.exports={createBlog,getBlog,updateBlog,deleteByQuery,deleteBlog}
