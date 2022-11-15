const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            lowercase: true,
            uppercase: true,
            required: "Title is required"
        },
        body: {
            type: String,
            trim: true,
            lowercase: true,
            uppercase: true,
            require: "Body is required"
        },
        authorId: {
            type: ObjectId,
            required:" AuthorId is required",
            trim: true,
            lowercase: true,
            uppercase: true,
            ref: "Author"

        },
        tags: {
            trim: true,
            lowercase: true,
            uppercase: true,
            type: [String],
        },

        category: {
            type: String,
            trim: true,
            lowercase: true,
            uppercase: true,
            required: "Category is required"
        },
        subcategory: 
            {
                type: [String]

            },
        
        createdAt: {
            type: Date,
            
        },
      updatedAt: {
            type: Date,
          
        },
        isPublished: {
            type: Boolean,
            trim: true,
            lowercase: true,
            uppercase: true,
            default: false,
        },

        publishedAt: {
            type: Date,
        },

        isDeleted: {
            trim: true,
            lowercase: true,
            uppercase: true,
            type: Boolean,
            default: false
        },

        deletedAt: {
            trim: true,
            lowercase: true,
            uppercase: true,
            type: Date,
                default: Date.now()

        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("blogDataBase", blogSchema);