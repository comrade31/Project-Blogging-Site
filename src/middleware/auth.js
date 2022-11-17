const jwt = require("jsonwebtoken");
const blogModel = require("../models/blogModel");

// # Authentication Middleware ==>>

const auth1 = function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        if (!token) return res.status(401).send({ status: false, msg: " token must be present for authentication " })

       jwt.verify(token, "BlogProject", function (err, decodedToken) {
            if (err) {
                return res.status(400).send({ status: false, msg: "token invalid" });
            } 
            // if(Date.now()>decodedToken.exp*1000) {
            //     return res.status(400).send({ status: false, msg: "token expired" });
            // }
                req.decodedToken = decodedToken
                next() 
        })
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}


// # Authorisation ==>>

let auth2 = async function logMethod(req, res, next) {
    try {
        let blogId = req.params.blogId
        let findblog = await blogModel.findById(blogId)
        if(!findblog)
        {return res.status(404).send("status:false, msg:Author's blog not found")}
        let authorId = findblog.authorId

        let token = req.headers["x-api-key"]
        let decodedToken = jwt.verify(token,"BlogProject")
        
        let UsertobeModified = decodedToken.userId

        if (!authorId === UsertobeModified)
            return res.status(403).send({ stauts: false, msg: "User and user's-token in not matched" })
        next()
    }
    catch (error) {
        res.status(500).send({ msz: "Error", error: error.message })
    }

}


module.exports = { auth1, auth2 }
