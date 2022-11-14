const blogModel = require("../models/blogModel")
const Valid = require("../validator/validator")
const {isValidObjectId} = require("mongoose")
const authorModel = require("../models/authorModel")



const createBlog = async function(req,res){

    try{
        
        const requestBody  = req.body
        const Id = req.body.authorId
        
        const { title,authorId ,body,tags,  category , subcategory } = requestBody
       

        if(!Valid.isValidRequestBody(requestBody)){
            return res.status(400).send({status:false,msg:" Pls Provide requestBody"})
        }
        if(!Valid.isValid(title)){
            return res.status(400).send({status:false,msg:" Pls Provide title for blog"})
        }
        if(!isValidObjectId(Id)){
            return res.status(400).send({status:false,msg:" Pls provide Valid author Id"})
        }
        if(!Valid.isValid(body)){
            return res.status(400).send({status:false,msg:" Pls Provide body"})
        }
       
        if(!Valid.isValid(tags)){
            return res.status(400).send({status:false,msg:"Pls provide tags"})
        }
        if(!Valid.isValid(category)){
            return res.status(400).send({status:false,msg:"pls provide category of Blog"})
        }
        if(!Valid.isValid(subcategory)){
            return res.status(400).send({status:false,msg:"pls provide subcategory of Blog"})
        }
        
        if(!Valid.isValid(authorId)){
            return res.status(400).send({status:false,msg:" Pls provide author Id"})
        }
        


        const validId = await authorModel.findById(Id)
        if (validId) {
            const blogCreated = await blogModel.create(requestBody)
            return res.status(201).send({ status: true, msg: 'blog created succesfully ', data: blogCreated })

        } else { res.status(400).send({ statusbar: false, msg: 'invalid authorid' }) }
    }

    catch(err){

     return res.status(500).send({status:false,msg:err.msg })

    }

} 


module.exports={createBlog}