const mongoose = require("mongoose")
const objectId = mongoose.Schema.Types.objectId;


const blogSchema = new mongoose.Schema( {
    title: {
        type:string,
        require:true
    },
    body: { 
        type:string,
        require:true
    },
    authorId:{
        type: objectId,
        ref:"author"
    },
    tags:{
        type:[String]
    },
    category:{
        type: String,
        require:true
    },
    subcategory:[String],
    deletedAt: Date,
    isDeleted:{
        type:Boolean,
        default: false
    },
    publishedAt: Date,
    isPublished:{
        type: Boolean,
        default: false
    }
},{timestamps: true});


module.exports = mongoose.model("Blog",blogSchema)