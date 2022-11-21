let authorModel = require("../models/authorModel")
let { isValid,isValidRequestBody } = require("../validator/validator")
const jwt = require("jsonwebtoken");

//<<<<<<<<----------------------- Create-Author -------------------->>>>>>>>>>>>>

let createAuthor = async function (req, res) {
  let Data = req.body
  const { fname, lname, title, email, password } = Data
  try {

//<<<<<<<<----------------- Data in body || not -------------------->>>>>>>>>>>>>

    if (!isValidRequestBody(Data))
     {return res.status(400).send({ status: false, msg: " Pls Provide requestBody" })}

//<<<<<<<<---------------- All varibles valibation ------------------>>>>>>>>>>>>>

    if (!isValid(fname))
     { return res.status(400).send({ status: false, msg: "fname is required" }) }

    if (!isValid(lname)) 
    { return res.status(400).send({ status: false, msg: "Lname is required" }) }

    if (!isValid(title))
     { return res.status(400).send({ status: false, msg: "Title is required" }) }

    if (!isValid(password))
     { return res.status(400).send({ status: false, msg: "Password is required" }) }

    if (!isValid(email))
     { return res.status(400).send({ status: false, msg: "Email is required" }) } 

//<<<<<<<<---------------- Email Re-use Validation ------------------>>>>>>>>>>>>>
    
    const isEmailAlreadyused = await authorModel.findOne({ email: email })
    if (isEmailAlreadyused)
     { return res.status(400).send({ status: false, msg: 'Email is already used' }) }

    else {
      let createAuthor = await authorModel.create(Data)
      res.status(201).send({ status: true, Data: createAuthor })
    }
  }
  catch (error)
   { res.status(500).send({ msz: "Error", error: error.message }) }
}
 
//*-----------------------------------------------------------------------------//
//*-----------------------------------------------------------------------------//

  
//<<<<<<<<--------------------------- Log-In ------------------------>>>>>>>>>>>>>

const login = async function (req, res) {
  try {
    const Data = req.body
      const email = req.body.email
      const password = req.body.password
      
      //<<<<<<<<-------------- Data in body || not ----------------->>>>>>>>>>>>>

    if (!isValidRequestBody(Data))
    {return res.status(400).send({ status: false, msg: "Provide Email and Passoword for login" })}

      if (!isValid(email)) 
      { return res.status(400).send({ status: false, msg: "pls provide email" }) }

      if (!isValid(password))
       { return res.status(400).send({ status: false, msg: "pls provide password" }) }

      //<<<<<<<<----------------- Token Generate -------------------->>>>>>>>>>>>>
      
 const author = await authorModel.findOne({ email: email, password: password })
          if (author) {
             const token = jwt.sign({ authorId:author._id },"BlogProject")
              return res.status(200).send({ status: true, msg:"Token Generated",Token: token })
          }
          else 
          {return res.status(401).send({ status: false, msg: "invalid credentials" }) }
      }
  
  catch (error) {
      return res.status(500).send({ msz: "Error", error: error.message })
  }
}


module.exports={createAuthor,login}
